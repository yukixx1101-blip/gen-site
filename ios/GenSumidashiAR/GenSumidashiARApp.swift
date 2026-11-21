import SwiftUI
import ARKit
import SceneKit
import UniformTypeIdentifiers

// Prototype only: AR tracking and camera raycasts do not provide survey-grade accuracy.
struct LayoutBackup: Decodable {
    let points: [LayoutPoint]
    let four: [String: FourReference]
}
struct LayoutPoint: Decodable, Identifiable {
    var id: String { "\(page)-\(name)-\(x)-\(y)" }
    let page: Int
    let x: Double
    let y: Double
    let name: String
    let type: String
}
struct PlanPoint: Decodable { let x: Double; let y: Double }
struct FourReference: Decodable {
    let pts: [PlanPoint]
    let valid: Bool?
}
struct SiteTarget: Identifiable {
    let id: String
    let name: String
    let type: String
    let position: SIMD3<Float>
}

@MainActor final class SurveyState: ObservableObject {
    @Published var backup: LayoutBackup?
    @Published var page = 1
    @Published var anchors: [SIMD3<Float>] = []
    @Published var selectedID: String?
    @Published var targets: [SiteTarget] = []
    @Published var status = "JSONバックアップを読み込んでください"
    @Published var tracking = "AR準備中"
    @Published var instruction = "現場のAをカメラでタップ"
    @Published var direction = "—"
    @Published var distance = "—"
    @Published var visible = false
    weak var view: ARSCNView?

    var reference: FourReference? { backup?.four[String(page)] }
    var pagePoints: [LayoutPoint] { backup?.points.filter { $0.page == page } ?? [] }

    func importBackup(_ data: Data) throws {
        let loaded = try JSONDecoder().decode(LayoutBackup.self, from: data)
        guard !loaded.points.isEmpty else { throw ImportError.empty }
        backup = loaded
        page = loaded.points[0].page
        reset()
        status = "読み込み完了。平面上の4点を順番に合わせてください"
    }

    enum ImportError: LocalizedError {
        case empty
        var errorDescription: String? { "登録点がありません" }
    }

    func reset() {
        anchors = []; targets = []; selectedID = nil
        direction = "—"; distance = "—"; visible = false
        instruction = "現場のAをカメラでタップ"
        view?.scene.rootNode.childNodes.filter { $0.name == "layout-target" }.forEach { $0.removeFromParentNode() }
    }

    func tap(_ point: CGPoint) {
        guard backup != nil else { status = "先にJSONを読み込んでください"; return }
        guard reference?.pts.count == 4, reference?.valid == true else {
            status = "選択ページの4点基準が未確定です"; return
        }
        guard anchors.count < 4, let view else { return }
        // Raycast to estimated horizontal floor. The user must tap the actual corresponding floor reference.
        guard let result = view.raycastQuery(from: point, allowing: .estimatedPlane, alignment: .horizontal)
            .flatMap({ view.session.raycast($0).first }) else {
            status = "床面を検出できません。床をゆっくり映して再試行してください"; return
        }
        let c = result.worldTransform.columns.3
        anchors.append(SIMD3(c.x, c.y, c.z))
        if anchors.count < 4 {
            instruction = "現場の\(String("ABCD"[String.Index(utf16Offset: anchors.count, in: "ABCD")]))をカメラでタップ"
            status = "\(anchors.count)/4点を登録"
        } else {
            buildTargets()
        }
    }

    // Inverse bilinear mapping of the PDF quadrilateral. This handles non-axis-aligned plans
    // approximately; it does NOT validate physical metric geometry or compensate AR drift.
    func uv(_ p: PlanPoint, corners: [PlanPoint]) -> SIMD2<Double>? {
        let a = SIMD2(corners[0].x, corners[0].y)
        let b = SIMD2(corners[1].x, corners[1].y)
        let c = SIMD2(corners[2].x, corners[2].y)
        let d = SIMD2(corners[3].x, corners[3].y)
        let target = SIMD2(p.x, p.y)
        var u = 0.5, v = 0.5
        for _ in 0..<16 {
            let f = a * ((1-u)*(1-v)) + b * (u*(1-v)) + c * (u*v) + d * ((1-u)*v) - target
            let du = (b-a)*(1-v) + (c-d)*v
            let dv = (d-a)*(1-u) + (c-b)*u
            let det = du.x*dv.y - du.y*dv.x
            guard abs(det) > 1e-8 else { return nil }
            u -= (f.x*dv.y-f.y*dv.x)/det
            v -= (du.x*f.y-du.y*f.x)/det
            if simd_length(f) < 0.0001 { break }
        }
        guard u.isFinite, v.isFinite else { return nil }
        return SIMD2(u,v)
    }

    func buildTargets() {
        guard let corners = reference?.pts, corners.count == 4, anchors.count == 4 else { return }
        // All four anchors should be coplanar. Warn if their heights disagree.
        let heights = anchors.map(\.y)
        guard (heights.max()! - heights.min()!) < 0.15 else {
            status = "4点の高さが一致しません。床面を確認してやり直してください"
            reset(); return
        }
        targets = pagePoints.compactMap { p in
            guard let t = uv(PlanPoint(x:p.x,y:p.y), corners:corners) else { return nil }
            let u = Float(t.x), v = Float(t.y)
            let a = anchors[0], b = anchors[1], c = anchors[2], d = anchors[3]
            let world = a*((1-u)*(1-v)) + b*(u*(1-v)) + c*(u*v) + d*((1-u)*v)
            return SiteTarget(id:p.id,name:p.name,type:p.type,position:world)
        }
        selectedID = targets.first?.id
        status = "4点合わせ完了（試験版）。位置はAR推定値。実測確認必須"
        instruction = "目的点を選んで移動してください"
        showMarkers()
    }

    func showMarkers() {
        guard let view else { return }
        view.scene.rootNode.childNodes.filter { $0.name == "layout-target" }.forEach { $0.removeFromParentNode() }
        for t in targets {
            let root = SCNNode()
            root.name = "layout-target"
            root.simdPosition = t.position
            let sphere = SCNSphere(radius: 0.045)
            sphere.firstMaterial?.diffuse.contents = UIColor.systemPink
            let marker = SCNNode(geometry:sphere)
            marker.position.y = 0.045
            root.addChildNode(marker)
            let text = SCNText(string:t.name, extrusionDepth:0.002)
            text.font = UIFont.boldSystemFont(ofSize:0.12)
            text.firstMaterial?.diffuse.contents = UIColor.white
            let label = SCNNode(geometry:text)
            label.scale = SCNVector3(0.5,0.5,0.5)
            label.position = SCNVector3(0.07,0.08,0)
            label.constraints = [SCNBillboardConstraint()]
            root.addChildNode(label)
            view.scene.rootNode.addChildNode(root)
        }
    }

    func updateCamera(_ camera: ARCamera, viewport: CGSize) {
        switch camera.trackingState {
        case .normal: tracking = "追跡中（推定）"
        case .limited: tracking = "追跡不安定・基準再確認"
        case .notAvailable: tracking = "追跡不可"
        }
        guard let target = targets.first(where: { $0.id == selectedID }) else { return }
        let pose = camera.transform
        let cameraPosition = SIMD3(pose.columns.3.x,pose.columns.3.y,pose.columns.3.z)
        let delta = target.position - cameraPosition
        let horizontal = SIMD3(delta.x,0,delta.z)
        distance = String(format:"%.0f mm（推定）",simd_length(horizontal)*1000)
        let projected = camera.projectPoint(target.position, orientation:.portrait, viewportSize:viewport)
        let onScreen = projected.z > 0 && projected.x >= 0 && projected.x <= viewport.width && projected.y >= 0 && projected.y <= viewport.height
        visible = onScreen
        if onScreen { direction = "画面内：十字マークを確認" }
        else {
            let forward = -SIMD3(pose.columns.2.x,0,pose.columns.2.z)
            let right = SIMD3(pose.columns.0.x,0,pose.columns.0.z)
            let f = simd_dot(simd_normalize(forward),simd_normalize(horizontal))
            let r = simd_dot(simd_normalize(right),simd_normalize(horizontal))
            if f < -0.4 { direction = r > 0 ? "↘ 右後方" : "↙ 左後方" }
            else if r > 0.35 { direction = "→ 右へ" }
            else if r < -0.35 { direction = "← 左へ" }
            else { direction = "↑ 前方へ" }
        }
    }
}

struct ARCameraView: UIViewRepresentable {
    @ObservedObject var state: SurveyState
    func makeCoordinator() -> Coordinator { Coordinator(state:state) }
    func makeUIView(context:Context) -> ARSCNView {
        let v = ARSCNView(frame:.zero)
        v.delegate = context.coordinator
        v.session.delegate = context.coordinator
        v.scene = SCNScene()
        v.automaticallyUpdatesLighting = true
        let tap = UITapGestureRecognizer(target:context.coordinator,action:#selector(Coordinator.tap(_:)))
        v.addGestureRecognizer(tap)
        state.view = v
        let config = ARWorldTrackingConfiguration()
        config.planeDetection = [.horizontal]
        v.session.run(config)
        return v
    }
    func updateUIView(_ uiView:ARSCNView,context:Context) {}
    final class Coordinator: NSObject, ARSCNViewDelegate, ARSessionDelegate {
        let state: SurveyState
        init(state:SurveyState) { self.state = state }
        @objc func tap(_ gesture:UITapGestureRecognizer) {
            let point = gesture.location(in:gesture.view)
            Task { @MainActor in state.tap(point) }
        }
        func session(_ session:ARSession, didUpdate frame:ARFrame) {
            let viewport = state.view?.bounds.size ?? .zero
            Task { @MainActor in state.updateCamera(frame.camera,viewport:viewport) }
        }
    }
}

struct ContentView: View {
    @StateObject private var state = SurveyState()
    @State private var importing = false
    var body: some View {
        ZStack(alignment:.top) {
            ARCameraView(state:state).ignoresSafeArea()
            VStack(spacing:10) {
                HStack {
                    Button("JSON読込") { importing = true }
                    Spacer()
                    Button("4点を再登録") { state.reset() }
                }
                .buttonStyle(.borderedProminent)
                Text(state.status).font(.caption).padding(7).background(.black.opacity(0.75)).cornerRadius(8)
                Text(state.tracking).font(.caption).bold()
                Text(state.instruction).font(.headline)
                if !state.targets.isEmpty {
                    Picker("立ち上げ位置",selection:$state.selectedID) {
                        ForEach(state.targets) { t in Text("\(t.name) / \(t.type)").tag(Optional(t.id)) }
                    }.pickerStyle(.menu)
                    Text(state.direction).font(.largeTitle).bold()
                    Text(state.distance).font(.title2).monospacedDigit()
                    if !state.visible { Text("目的点は画面外です").font(.caption) }
                } else { Text("登録済み基準：\(state.anchors.count)/4").font(.title2) }
                Spacer()
                Text("試験版：測位は推定値です。施工位置は巻尺・レーザー等で必ず確認してください。")
                    .font(.caption2).padding(8).background(.black.opacity(0.75))
            }
            .padding()
            .foregroundStyle(.white)
        }
        .fileImporter(isPresented:$importing,allowedContentTypes:[.json]) { result in
            do {
                let url = try result.get()
                let access = url.startAccessingSecurityScopedResource()
                defer { if access { url.stopAccessingSecurityScopedResource() } }
                let data = try Data(contentsOf:url)
                try state.importBackup(data)
            } catch { state.status = "読込エラー：\(error.localizedDescription)" }
        }
    }
}

@main struct GenSumidashiARApp: App {
    var body: some Scene { WindowGroup { ContentView() } }
}
