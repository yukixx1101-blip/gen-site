export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      {/* 写真を殺さない薄めの補正 */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_35%,rgba(0,0,0,0.40)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,164,108,0.18),transparent_35%)]" />

      {/* コンテンツ */}
      <div className="relative flex min-h-screen items-end px-5 pt-28 pb-12">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[28px] border border-white/15 bg-black/20 p-6 backdrop-blur-[6px]">
            <p className="text-[11px] tracking-[0.35em] text-[#d4b27a]">
              KABUSHIKIGAISHA GEN
            </p>

            <h2 className="mt-4 text-[38px] font-black leading-[1.12] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
              暮らしの裏側を、
              <br />
              確かな技術で
              <br />
              支えていく。
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              リフォーム・給排水・土木工事まで。
              <br />
              株式会社 玄は、目に見えない部分にこそ責任を持ち、
              毎日の安心につながる施工を積み重ねています。
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3">
              <a
                href="#contact"
                className="rounded-full bg-[#c6a46c] px-6 py-4 text-center font-bold text-black shadow-[0_8px_30px_rgba(198,164,108,0.28)]"
              >
                無料で相談する
              </a>

              <a
                href="#works"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-4 text-center font-bold text-white backdrop-blur-sm"
              >
                施工実績を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}