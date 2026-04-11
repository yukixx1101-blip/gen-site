"use client";

import { useState } from "react";

export default function ContactForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="px-5 py-16 pb-24">
      <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-[#121212] p-6">
        <p className="text-xs tracking-[0.35em] text-[#c6a46c]">CONTACT</p>
        <h2 className="mt-4 text-3xl font-black">お問い合わせ</h2>
        <p className="mt-4 text-sm leading-7 text-white/70">
          小規模修繕から各種工事まで、お気軽にご相談ください。
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="name"
            type="text"
            placeholder="お名前"
            required
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            required
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none"
          />

          <textarea
            name="message"
            placeholder="ご相談内容"
            required
            rows={5}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#c6a46c] px-6 py-4 font-bold text-black"
          >
            送信する
          </button>
        </form>

        {done && (
          <p className="mt-4 text-sm text-white/80">
            送信ありがとうございました。
          </p>
        )}
      </div>
    </section>
  );
}