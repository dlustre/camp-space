import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-40 p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="font-semibold text-3xl z-10">DENNIS LUSTRE</h1>
      </div>
      <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0 text-left">
        <a
          href="https://drive.google.com/drive/u/1/folders/1owCN0yZkYuiKXcibYXAdY1-9pQwkNjy7"
          className="group flex justify-between rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Assignment 1{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Type &apos;Dennis&apos; to play sound files.
            </p>
          </div>
          <div>
            <Image
              src='/camp-space/type_name.png'
              alt="type_name"
              width={1449 / 5}
              height={929 / 5}
            />
          </div>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Coming Soon{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            More stuff coming soon!
          </p>
        </a>
      </div>
    </main>
  )
}
