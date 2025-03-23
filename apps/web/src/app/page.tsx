import Navbar from "@/app/components/navbar/Navbar";
import BlurText from "@/app/components/BlurText";
import AuroraBackground from "./components/background/AuroraBackground";

export default function Home() {
  return (
    <AuroraBackground>
      <Navbar />

      <div className="mx-auto h-screen grid grid-cols-1 content-center text-center flex-wrap space-between gap-4">
        <BlurText
          text="Welcome to the Website"
          delay={150}
          animateBy="words"
          direction="top"
          className="xl:text-7xl md:text-5xl text-3xl font-semibold text-white mx-auto"
        />

        <p className="md:max-w-3xl max-w-md mx-auto md:text-xl text-lg font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper
          nisl ut suscipit imperdiet. Nam id ante vitae arcu tempus
          pellentesque. Mauris id laoreet eros. Nulla facilisi. Pellentesque
          dapibus congue urna. Donec ullamcorper posuere lectus, tempor congue
          turpis finibus quis.
        </p>
      </div>
    </AuroraBackground>
  );
}
