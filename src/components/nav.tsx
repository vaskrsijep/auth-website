export default function Nav() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-left gap-5 font-mono text-sm lg:flex">
        <a
        href="/"
        className="relative left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 rounded-xl mb-5"
      >
        Home
      </a>
      <a
        href="/secret"
        className="relative left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 rounded-xl"
      >
        Secret
      </a>
      
    </div>
  );
}
