import Features from "./Features";
import CommonQuestions from "./CommonQuestions";
import Tutorial from "./Tutorial";
import NavBar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import TrendingCarousel from './TrendingCarousel';


export default function Landing() {
  return (
    <div className="absolute top-0 z-[-2] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] px-4 py-8">
      <div className="container mx-auto">
        <NavBar />
        <section className="min-h-screen flex items-center justify-center">

          <Hero />
        </section>

        <section className="mt-24">
          <Features />
        </section>


        <section className="mt-24">
          <Tutorial />
        </section>
      </div>

      <Footer />
    </div>
  );
}
