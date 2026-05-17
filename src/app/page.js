import Image from "next/image";
import { Banner } from "./components/Banner";
import AvailableTutors from "./components/AvailableTutors";
import HowItWorks from "./components/HowItWorks";
import PlatformStats from "./components/PlatformStats";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AvailableTutors></AvailableTutors> 
      <HowItWorks></HowItWorks>
      <PlatformStats></PlatformStats>
    </div>
  );
}
