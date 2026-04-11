const works = [
  {
    image: "/images/work1.jpg",
    category: "REFORM",
    title: "水まわりリフォーム工事",
    text: "使いやすさと清潔感を両立した改修施工。",
  },
  {
    image: "/images/work2.jpg",
    category: "PLUMBING",
    title: "給排水設備更新工事",
    text: "見えない部分まで丁寧に更新対応。",
  },
  {
    image: "/images/work3.jpg",
    category: "CIVIL",
    title: "外構・土木工事",
    text: "街の足元を支える基盤整備を施工。",
  },
];

export default function Works() {
  return (
    <section id="works" className="px-5 py-16">
      <div className="mx-auto max-w-md">
        <p className="text-xs tracking-[0.35em] text-[#c6a46c]">WORKS</p>
        <h2 className="mt-4 text-3xl font-black">施工実績</h2>

        <div className="mt-8 space-y-5">
          {works.map((work) => (
            <div
              key={work.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#141414]"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${work.image}')` }}
              />
              <div className="p-5">
                <p className="text-xs tracking-[0.3em] text-[#c6a46c]">
                  {work.category}
                </p>
                <h3 className="mt-3 text-lg font-bold">{work.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {work.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}