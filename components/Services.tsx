const services = [
  {
    no: "01",
    title: "リフォーム",
    text: "住宅・店舗・水まわり改修まで。使いやすさと快適さを両立する施工を行います。",
  },
  {
    no: "02",
    title: "給排水設備",
    text: "新設・更新・修繕まで対応。見えない設備こそ、確かな品質で仕上げます。",
  },
  {
    no: "03",
    title: "土木工事",
    text: "外構・造成・配管工事など、街の基盤を足元から支える工事を行います。",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-16">
      <div className="mx-auto max-w-md">
        <p className="text-xs tracking-[0.35em] text-[#c6a46c]">SERVICES</p>
        <h2 className="mt-4 text-3xl font-black">事業内容</h2>

        <div className="mt-8 space-y-4">
          {services.map((service) => (
            <div
              key={service.no}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs tracking-[0.3em] text-[#c6a46c]">
                {service.no}
              </p>
              <h3 className="mt-3 text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}