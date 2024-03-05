import Image from 'next/image'
import { generatePath } from '../utils/generatePath';
export default function Home() {

  const assignments = [
    {
      title: 'Assignment 1',
      description: 'Type \'Dennis\' to play sound files.',
      link: 'https://drive.google.com/drive/u/1/folders/1owCN0yZkYuiKXcibYXAdY1-9pQwkNjy7',
      image: generatePath('/hw1.png'),
      targetBlank: true,
    },
    {
      title: 'Assignment 2',
      description: 'Play a soundfile on the browser.',
      link: generatePath('/hw2'),
      image: generatePath('/hw2.png'),
      targetBlank: false,
    },
    {
      title: 'Assignment 3',
      description: 'Play different waveforms on the browser.',
      link: generatePath('/hw3'),
      image: generatePath('/hw3.png'),
      targetBlank: false,
    },
    {
      title: 'Assignment 4',
      description: 'A sequencer built by using phasor -> subdiv to play notes on a table. The probability of each note in the sequence can be set.',
      link: 'https://drive.google.com/drive/u/1/folders/1LYN9vCU2TH9s0uTVJXsuvO2IK0KprJfA',
      image: generatePath('/hw4.png'),
      targetBlank: true,
    },
    {
      title: 'Project Proposal',
      description: 'Proposal for a Tape Saturator VST plugin.',
      link: generatePath('/proposal'),
      image: generatePath('/proposal.png'),
      targetBlank: false,
    },
    {
      title: 'Progress Report',
      description: 'Progress report for the final project.',
      link: generatePath('/progress-report'),
      image: generatePath('/filter-patch.png'),
      targetBlank: false,
    }
  ]

  return (
    <main className="flex min-h-screen flex-col items-center gap-40 p-24">
      <div className="relative flex place-items-center border-2 border-w shadow-md border-slate-300 bg-opacity-50 rounded-lg py-3 px-4 bg-slate-700 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] i before:bg-gradient-to-br i before:from-transparent i before:to-blue-700 i before:opacity-10 i after:from-sky-900 i after:via-[#0141ff] i after:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="font-semibold text-3xl z-10 drop-shadow-lg">DENNIS LUSTRE</h1>
      </div>
      <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0 text-left ">
        {assignments.map((assignment, i) =>
          <a
            key={i}
            href={assignment.link}
            className="group flex justify-between rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 hover:border-neutral-700 hover:bg-neutral-800/30"
            target={assignment.targetBlank ? "_blank" : undefined}
            rel={assignment.targetBlank ? "noopener noreferrer" : undefined}
          >
            <div>
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {assignment.title}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {assignment.description}
              </p>
            </div>
            <div>
              <Image
                src={assignment.image}
                alt={assignment.title}
                width={1449 / 5}
                height={929 / 5}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </a>
        )}
      </div>
    </main>
  )
}
