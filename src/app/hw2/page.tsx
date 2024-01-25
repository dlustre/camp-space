"use client"

import { generatePath } from '@/utils/generatePath';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [audio, SetAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, SetPlaying] = useState<boolean>(false);

  function start() {
    if (!(audio instanceof HTMLAudioElement)) return
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play();
    SetPlaying(true);
  }

  function stop() {
    if (audio instanceof HTMLAudioElement) {
      audio.pause();
      SetPlaying(false);
    }
  }

  useEffect(() => SetAudio(new Audio(generatePath("/hw2.wav"))), []);

  useEffect(() => {
    if (audio instanceof HTMLAudioElement) {
      audio.addEventListener('ended', () => SetPlaying(false));
      return () => audio.removeEventListener('ended', () => SetPlaying(false));
    }
  })

  function fadeOut() {
    if (audio instanceof HTMLAudioElement && !audio.paused) {
      const fadeAudio = setInterval(() => {
        if (audio.volume <= 0.01) {
          clearInterval(fadeAudio);
          audio.volume = 0.0;
          audio.pause();
          SetPlaying(false);
          return;
        }
        audio.volume -= 0.1;
      }, 200);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-40 p-24">
      <div
        className={`${playing ? "py-11 px-12" : "py-3 px-4"} transition-all relative flex place-items-center border-2 border-w shadow-md border-slate-300 bg-opacity-50 rounded-lg bg-slate-700 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] i before:bg-gradient-to-br i before:from-transparent i before:to-blue-700 i before:opacity-10 i after:from-sky-900 i after:via-[#0141ff] i after:opacity-40 before:lg:h-[360px] z-[-1]`}
      >
        <h1
          className={`font-semibold text-3xl z-10 drop-shadow-lg}`}
        >
          {playing ? "Playing..." : "Click Stuff!"}
        </h1>
      </div>
      <div className='flex gap-4 w-auto rounded-lg shadow-[1px_4px_15px_-1px_rgb(0_0_0/0.1)] h-full bg-gray-400 p-8 justify-center bg-opacity-20'>
        <button
          disabled={!playing}
          className={`${playing ? "hover:bg-indigo-900" : "border-slate-600 text-slate-600"} font-bold border-2 border-w shadow-md border-slate-300 bg-opacity-50 rounded-lg py-3 px-4 transition-all`}
          onClick={fadeOut}
        >
          Fade Out
        </button>
        <button
          className="font-bold border-2 border-w shadow-md border-slate-300 bg-opacity-50 rounded-lg py-3 px-4 transition-all hover:bg-emerald-500"
          onClick={start}
        >
          Start
        </button>
        <button
          className="font-bold border-2 border-w shadow-md border-slate-300 bg-opacity-50 rounded-lg py-3 px-4 transition-all hover:bg-red-600"
          onClick={stop}
        >
          Stop
        </button>
      </div>
    </div >
  )
}
