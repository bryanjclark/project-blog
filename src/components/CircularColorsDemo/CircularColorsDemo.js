"use client";
import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setTimeElapsed(0);
  }, []);

  useEffect(() => {
    const handleTick = () => {
      if (isPlaying) {
        setTimeElapsed((prev) => prev + 1);
      }
    };
    const id = window.setInterval(handleTick, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
              {isSelected && (
                <motion.div
                  layoutId={"highlight"}
                  className={styles.selectedColorOutline}
                  initial={false}
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {isPlaying ? (
            <button onClick={togglePlaying}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button onClick={togglePlaying}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button onClick={reset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
