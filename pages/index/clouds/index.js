import Cloud from "./cloud";
import Image from "next/image";
import { useState } from "react";
import cn from "classnames";
import useWindowDimensions from "@/shared/hooks/useWindowDimension";

const Clouds = () => {
  let [theme, setTheme] = useState(true);

  const themeToggle = () => {
    setTheme((theme) => !theme);
  };

  let { width: screenWidth } = useWindowDimensions();

  const wrapperCss = cn("flex flex-col items-center h-[100vh] cursor-pointer", {
    "backdrop-brightness-0": !theme,
  });

  const textCss = cn("text-5xl -mt-8", {
    "brightness-200 saturate-100 text-white border-white shadow-lg": !theme,
  });

  return (
    <div className={wrapperCss}>
      <Image
        src="/day-and-night.png"
        width={60}
        height={60}
        alt="theme switcher"
        className="absolute top left-0 m-6 z-30"
        onClick={themeToggle}
      />
      <Cloud
        width={1400}
        height={300}
        theme={theme}
        imageSrc="/dark-cloud.png"
        alt="dark cloud"
        className="mt-10"
      />
      <Image
        src="/line.png"
        width={400}
        height={50}
        alt="line"
        className="right-[20px] relative"
      />
      <h1 className={textCss}>&nbsp;&nbsp;&nbsp;ΜΔGIC</h1>

      <div className="flex flex-col items-center">
        <Image
          src="/fox.png"
          width={500}
          height={60}
          alt="theme switcher"
          className="m-6 relative z-10"
        ></Image>
        <audio controls autoplay className="-mt-10">
          <source src="/theme.mp3" type="audio/mp3" />
        </audio>
      </div>
      <Image
        src="/ground.png"
        width={2000}
        height={5}
        alt="theme switcher"
        className="-m-[230px] relative z-0"
      />
    </div>
  );
};

export default Clouds;
