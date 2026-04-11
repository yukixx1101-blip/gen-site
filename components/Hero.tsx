export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.82)_100%)]" />

      <div className="relative flex min-h-screen items-center px-5 pt-28 pb-14">
        <div className="mx-auto max-w-md">
          <p className="text-xs tracking-[0.35em] text-[#c6a46c]">
            REFORM / PLUMBING / CIVIL ENGINEERING
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight">
            見えない仕事で、
            <br />
            暮らしと街を
            <br />
            支えている。
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/80">
            リフォーム・給排水・土木工事。
            <br />
            完成後には見えなくなる部分にこそ責任を持ち、
            株式会社 玄は日々の安心を支えます。
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[#c6a46c] px-6 py-4 text-center font-bold text-black"
            >
              無料で相談する
            </a>

            <a
              href="#works"
              className="rounded-full border border-white/25 bg-black/20 px-6 py-4 text-center font-bold text-white"
            >
              実績を見る
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 backdrop-blur-sm">
              <p className="text-xl font-black text-[#c6a46c]">3</p>
              <p className="mt-1 text-[11px] text-white/70">事業領域</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 backdrop-blur-sm">
              <p className="text-xl font-black text-[#c6a46c]">24h</p>
              <p className="mt-1 text-[11px] text-white/70">相談対応想定</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 backdrop-blur-sm">
              <p className="text-xl font-black text-[#c6a46c]">100%</p>
              <p className="mt-1 text-[11px] text-white/70">丁寧施工主義</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}