import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Services from "@/components/Services";
import Works from "@/components/Works";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <Hero />
      <Concept />
      <Services />
      <Works />
      <ContactForm />
    </main>
  );
}