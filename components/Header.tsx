export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-white/50">GEN</p>
          <h1 className="text-base font-bold">株式会社 玄</h1>
        </div>

        <a
          href="#contact"
          className="rounded-full bg-[#c6a46c] px-4 py-2 text-sm font-bold text-black"
        >
          相談する
        </a>
      </div>
    </header>
  );
}