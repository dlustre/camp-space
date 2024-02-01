"use client"

import React, { useEffect, useState } from 'react'

// MIDI message types
const messageTypes = {
  noteOn: 144,
  noteOff: 128,
}

// MIDI notes (C4 to C6)
const midiNotes: Record<number, string> = {
  60: 'C4',
  61: 'C#4',
  62: 'D4',
  63: 'D#4',
  64: 'E4',
  65: 'F4',
  66: 'F#4',
  67: 'G4',
  68: 'G#4',
  69: 'A4',
  70: 'A#4',
  71: 'B4',
  72: 'C5',
  73: 'C#5',
  74: 'D5',
  75: 'D#5',
  76: 'E5',
  77: 'F5',
  78: 'F#5',
  79: 'G5',
  80: 'G#5',
  81: 'A5',
  82: 'A#5',
  83: 'B5',
  84: 'C6',
}

// Colors for the keys
const waveformColors = {
  sine: 'bg-gradient-to-t from-purple-600 to-violet-400',
  square: 'bg-gradient-to-t from-blue-600 to-sky-400',
  sawtooth: 'bg-gradient-to-t from-orange-600 to-amber-400',
  triangle: 'bg-gradient-to-t from-green-600 to-lime-400',
}

// Colors for the piano shadow
const waveformShadowColors = {
  sine: 'shadow-purple-600',
  square: 'shadow-blue-600',
  sawtooth: 'shadow-orange-600',
  triangle: 'shadow-green-600',
}

// True if note is natural
function isNatural(note: number) {
  return midiNotes[note].length === 2;
}

// Converts MIDI note to frequency
function midiToFrequency(note: number) {
  const a = 440;
  return (a / 32) * (2 ** ((note - 9) / 12));
}

const oscillators: Record<number, {
  oscillator: OscillatorNode,
  oscillatorGain: GainNode,
}> = {};

export default function Page() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [waveform, setWaveform] = useState<'sine' | 'square' | 'sawtooth' | 'triangle'>('sine');
  const [isMobile, setIsMobile] = useState<boolean>(true);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize AudioContext
  useEffect(() => { setAudioContext(new AudioContext()) }, []);

  // Initialize MIDI
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(handleMidiSuccess, handleMidiFailure);
    }
  });

  function handleMidiSuccess(midiAccess: MIDIAccess) {
    // midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;
    // console.log(inputs);

    // Add event listeners to all MIDI inputs
    inputs.forEach((input) => {
      // console.log(input);
      input.addEventListener('midimessage', (message) => {
        if (!(message instanceof MIDIMessageEvent)) return;

        // console.log(message.data);

        const { messageType, note, velocity } = {
          messageType: message.data[0],
          note: message.data[1],
          velocity: message.data[2],
        };

        if (messageType === messageTypes.noteOn) {
          noteOn(note, velocity);
          noteOff(note, velocity);
        }
        // else if (messageType === messageTypes.noteOff) noteOff(note, velocity);
      })
    });
  }

  function noteOn(note: number, velocity: number) {
    if (audioContext === null) return;
    // if (oscillators[note]) return;

    // Init oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = waveform;
    oscillator.frequency.value = midiToFrequency(note);

    // Init gain
    const oscillatorGain = audioContext.createGain();
    oscillatorGain.gain.value = velocity / 127;

    // Signal chain: oscillator -> gain -> destination
    oscillator.connect(oscillatorGain);
    oscillatorGain.connect(audioContext.destination);

    oscillators[note] = { oscillator, oscillatorGain };

    oscillator.start();

    // console.log(oscillators);
  }

  function noteOff(note: number, velocity: number) {
    if (audioContext === null) return;
    if (!oscillators[note]) return;
    const { oscillator, oscillatorGain } = oscillators[note];

    // Fade out gain
    oscillatorGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);

    // Stop oscillator and clean up
    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      delete oscillators[note];
    }, 1000);

    // console.log(oscillators);
  }

  // function updateDevices(event: Event) {
  //   console.log(event);
  // }

  function handleMidiFailure() {
    console.log('Could not connect to MIDI');
  }

  // Key component for piano
  function Key({ note }: { note: number }) {
    const [pressed, setPressed] = useState<boolean>(false);
    const naturalStyle = `${pressed ? waveformColors[waveform] : 'bg-white'} h-36 lg:w-12 xl:w-14 w-8 pt-20 font-bold text-black border-black`;
    const accidentalStyle = `${pressed ? waveformColors[waveform] : 'bg-black'} h-20 lg:w-6 xl:w-8 w-5 pt-10 border-black xl:-translate-x-4 -translate-x-3 absolute`;
    return <button
      className={`${isNatural(note) ? naturalStyle : accidentalStyle} rounded border-2 text-[10px] xl:text-sm`}
      onMouseDown={() => {
        noteOn(note, 60);
        noteOff(note, 60);
        setPressed(true);
      }}
      onMouseUp={() => {
        // noteOff(note, 60);
        setPressed(false);
      }}
      onMouseLeave={() => {
        // noteOff(note, 60);
        setPressed(false);
      }}
    >{midiNotes[note]}</button>
  }

  // Piano component
  function Piano({ isMobile = false }: { isMobile: boolean }) {
    // If mobile, only show C4 to C5
    const filteredNotes = Object.keys(midiNotes)
      .filter(note => !isMobile || (Number.parseInt(note) >= 60 && Number.parseInt(note) <= 72))
      .reduce((obj: Record<number, string>, note) => {
        obj[Number.parseInt(note)] = midiNotes[Number.parseInt(note)];
        return obj;
      }, {});

    return <div>
      {Object.keys(filteredNotes).map((note) => <Key key={note} note={parseInt(note)} />)}
    </div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-40 p-24">
      <div
        className={`relative flex place-items-center p-4 shadow-md border-slate-300 bg-opacity-50 rounded-lg bg-slate-700 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] i before:bg-gradient-to-br i before:from-transparent i before:to-blue-700 i before:opacity-10 i after:from-sky-900 i after:via-[#0141ff] i after:opacity-40 before:lg:h-[360px] z-[-1]`}
      >
        <h1
          className={`font-semibold text-3xl z-10 drop-shadow-lg}`}
        >
          Assignment 3
        </h1>
      </div>
      <div>
        <p className="text-sm lg:text-xl font-semibold flex justify-center items-center gap-6">
          Play a
          <button
            className='flex flex-col items-center transition-all hover:scale-110 translate-y-2 hover:translate-y-0 hover:text-3xl'
            onClick={() => {
              switch (waveform) {
                case 'sine':
                  setWaveform('square');
                  break;
                case 'square':
                  setWaveform('sawtooth');
                  break;
                case 'sawtooth':
                  setWaveform('triangle');
                  break;
                case 'triangle':
                  setWaveform('sine');
                  break;
              }
            }}
          >
            <p className='underline text-xl lg:text-3xl'>{waveform}</p>
            <p>&uarr;</p>
          </button>
          wave on the browser.
        </p >
      </div>
      <div className={`border-2 w-[80vw] lg:w-full xl:p-16 py-16 bg-zinc-800 rounded-md flex flex-col items-center justify-center gap-4 shadow-[0_20px_50px] ${waveformShadowColors[waveform]}`} >
        <Piano isMobile={isMobile} />
        <p className="lg:text-xl font-semibold text-center">{`Click on the piano! 🎹`}</p>
      </div>
    </div >
  )
}
