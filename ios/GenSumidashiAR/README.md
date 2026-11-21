# GEN SUMIDASHI AR — iPhone 11 prototype
2026-11-22

Existing browser app remains at /sumidashi/. This is a separate native iOS ARKit prototype.

## Build
Requires macOS, Xcode and XcodeGen. Run `xcodegen generate` in this folder, open GenSumidashiAR.xcodeproj in Xcode, choose your signing team, and deploy to an ARKit-compatible iPhone (iPhone 11 supported).

## Workflow
1. In the browser app, load the PDF, register A–D in section ③, enter AB/BC/CD/DA and confirm, then register riser points in section ②.
2. Export JSON backup. Transfer JSON to iPhone Files.
3. In native app, import JSON. Walk to each corresponding floor reference A→B→C→D, tapping each point sequentially. All four need not be visible simultaneously.
4. Select a riser. AR camera tracking maintains a world-relative estimate. When target is outside camera view, show direction and horizontal distance in mm.
5. If tracking is limited/lost, re-register references. Always verify construction dimensions with physical instruments.

## Limitations
- **Not construction-grade**. No ±5 mm accuracy guarantee.
- Raycasts onto estimated horizontal plane may be wrong; 4 anchors are not validated against input side dimensions in this prototype.
- No persistence of AR anchors across sessions, no automatic re-localization, no surveyed control points.
- iPhone 11 has no LiDAR; tracking can drift, especially in large, feature-poor spaces.
- Geometry uses inverse bilinear interpolation of PDF quadrilateral. It is an approximation, not a certified metrology transform.
- iPhone camera preview cannot be provided via GitHub Pages alone. Native install/signing required.
- This source has not been compiled or tested on an iPhone in this environment.
