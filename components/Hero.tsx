export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.80)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,164,108,0.20),transparent_35%)]" />

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
        </div>
      </div>
    </section>
  );
}