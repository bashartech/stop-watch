"use client"; 
import { useState, useRef, useEffect, ChangeEvent } from "react"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";

export default function Countdown() {

const [duration, setDuration] = useState<number | string>("");
const [timeLeft, setTimeLeft] = useState<number>(0);
const [isActive, setIsActive] = useState<boolean>(false);
const [isPaused, setIsPaused] = useState<boolean>(false);
const timerRef = useRef<NodeJS.Timeout | null>(null);

const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

 return (
    <div className="flex flex-col border items-center justify-center h-screen bg-black-100 dark:bg-white-900">
      {/* Timer box container */}
      <div className=" shadow-white  border rounded bg-black dark:bg-white-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-white-800 dark:text-white-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
         <div className="flex items-center mb-6 text-white-800 dark:text-white-200" >
          <Input
            className="flex-1 mr-4 rounded-md border-white-900   placeholder-white text-white dark:placeholder-white dark:border-white-900 dark:bg-white-700 dark:text-white"
            type="number"
            id="duration"
            placeholder ="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
          /> 
          
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-white-800 dark:text-white-200"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-white-800 dark:text-white-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-white-800 dark:text-white-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-white-800 dark:text-white-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-white-800 dark:text-white-200"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
};

