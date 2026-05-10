import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // A placeholder lofi stream / ambient noise url
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.play().catch(() => setIsPlayingMusic(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayingMusic]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minute break
        new Audio('/bell.mp3').play().catch(() => {});
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60); // back to 25 min focus
        new Audio('/bell.mp3').play().catch(() => {});
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = isBreak ? ((5 * 60 - timeLeft) / (5 * 60)) * 100 : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 relative">
      <button 
        onClick={toggleMusic}
        className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isPlayingMusic ? 'bg-primary-blue text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
        title="Toggle Ambient Music"
      >
        <Music className="w-5 h-5" />
      </button>
      
      <h2 className="text-xl font-semibold mb-6 text-white text-center">
        {isBreak ? "Break Time" : "Focus Time"}
      </h2>
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-700"
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            className={`stroke-current ${isBreak ? 'text-[#10B981]' : 'text-primary-blue'}`}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - percentage / 100) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-full flex items-center justify-center transition-colors font-medium ${
            isActive 
              ? 'bg-[#EF4444] text-white hover:bg-red-600' 
              : 'bg-primary-blue text-white hover:bg-blue-600'
          }`}
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
          title="Reset"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}
