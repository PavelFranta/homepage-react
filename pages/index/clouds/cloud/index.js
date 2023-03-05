import React from "react";

import Image from "next/image";
import { useId } from "react";
import { useState, useEffect } from "react";
import useWindowDimensions from "@/shared/hooks/useWindowDimension";
import cn from "classnames";
import Drop from "./drop";

function Cloud({ width, height, imageSrc, alt, className, theme }) {
  const id = useId();

  let { height: screenHeight, width: screenWidth } = useWindowDimensions();

  let [fallingObjectsSlow, setFallingObjectsSlow] = useState([]);
  let [fallingObjectsNormal, setFallingObjectsNormal] = useState([]);
  let [fallingObjectsFast, setFallingObjectsFast] = useState([]);
  let [dropColor, setDropColor] = useState("#c0c0c0");

  const cloudCss = cn({
    "brightness-200 saturate-100": !theme,
  });

  useEffect(() => {
    let intervalCreate;

    if (screenWidth < 900) {
      clearInterval(intervalCreate);
      return;
    }

    let rainAroundTextRestriction = (obj) => {
      if (obj.positionY >= 1300) {
        return false;
      }
      if (obj.positionX < 488 || obj.positionX > 875) {
        return true;
      }
      if (obj.positionY > 710) {
        return false;
      }
      return true;
    };

    const createNewDrop = () => {
      return {
        positionX: Math.floor(Math.random() * 850) + 310,
        positionY: 370 + Math.floor(Math.random() * 40) - 20,
        dropColor: dropColor,
      };
    };

    intervalCreate = setInterval(() => {
      setFallingObjectsSlow((fallingObjects) => [
        ...fallingObjects.filter((obj) => rainAroundTextRestriction(obj)),
        createNewDrop(),
      ]);

      setFallingObjectsNormal((fallingObjects) => [
        ...fallingObjects.filter((obj) => rainAroundTextRestriction(obj)),
        createNewDrop(),
      ]);

      setFallingObjectsFast((fallingObjects) => [
        ...fallingObjects.filter((obj) => rainAroundTextRestriction(obj)),
        createNewDrop(),
      ]);
    }, 70);

    return () => clearInterval(intervalCreate);
  }, [screenHeight, screenWidth, dropColor]);

  useEffect(() => {
    setDropColor(theme ? "#c0c0c0" : "gold");
  }, [theme]);

  useEffect(() => {
    let intervalDropMoveDownSlow,
      intervalDropMoveDownNormal,
      intervalDropMoveDownFast;

    if (screenWidth < 900) {
      setFallingObjectsSlow([]);
      setFallingObjectsNormal([]);
      setFallingObjectsFast([]);
      clearInterval(intervalDropMoveDownSlow);
      clearInterval(intervalDropMoveDownNormal);
      clearInterval(intervalDropMoveDownFast);
      return;
    }

    intervalDropMoveDownSlow = setInterval(() => {
      setFallingObjectsSlow((fallingObjects) =>
        fallingObjects.map((fallingObject) => {
          return {
            ...fallingObject,
            positionY: fallingObject.positionY + 1,
          };
        })
      );
    }, 40);

    intervalDropMoveDownNormal = setInterval(() => {
      setFallingObjectsNormal((fallingObjects) =>
        fallingObjects.map((fallingObject) => {
          return {
            ...fallingObject,
            positionY: fallingObject.positionY + 1,
          };
        })
      );
    }, 25);

    intervalDropMoveDownFast = setInterval(() => {
      setFallingObjectsFast((fallingObjects) =>
        fallingObjects.map((fallingObject) => {
          return {
            ...fallingObject,
            positionY: fallingObject.positionY + 0.5,
          };
        })
      );
    }, 10);

    return () => {
      clearInterval(intervalDropMoveDownSlow);
      clearInterval(intervalDropMoveDownNormal);
      clearInterval(intervalDropMoveDownFast);
    };
  }, [screenWidth]);

  return (
    <div className={className + " cursor-pointer relative"}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cloudCss}
      ></Image>

      {fallingObjectsSlow.map((object, index) => (
        <Drop
          key={`drop` + index}
          positionX={object.positionX}
          positionY={object.positionY}
          dropColor={object.dropColor}
        />
      ))}

      {fallingObjectsNormal.map((object, index) => (
        <Drop
          key={`drop` + index}
          positionX={object.positionX}
          positionY={object.positionY}
          dropColor={object.dropColor}
        />
      ))}

      {fallingObjectsFast.map((object, index) => (
        <Drop
          key={`drop` + index}
          positionX={object.positionX}
          positionY={object.positionY}
          dropColor={object.dropColor}
        />
      ))}
    </div>
  );
}

export default Cloud;
