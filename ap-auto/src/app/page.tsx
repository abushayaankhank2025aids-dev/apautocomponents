import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProductShowcase, InfrastructureBand, QualityBand, IndustriesBand } from "@/components/sections/HomeSections";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CtaBand } from "@/components/sections/CtaBand";
import { CinematicIntro } from "@/components/sections/CinematicIntro";
export default function Home() {
  return (<><CinematicIntro /><Hero /><Intro /><ServiceCards /><ProductShowcase /><QualityBand /><IndustriesBand /><InfrastructureBand /><WhyChooseUs /><CtaBand /></>);
}
