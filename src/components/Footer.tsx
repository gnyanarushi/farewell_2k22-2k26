const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="relative px-6 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/95 bg-white/94 p-8 text-center shadow-[0_20px_45px_-24px_rgba(76,29,149,0.45)] backdrop-blur-xl dark:border-white/20 dark:bg-[#161028]/88">
          <div className="font-display text-2xl font-semibold text-[#1f1038] dark:text-violet-50 sm:text-3xl">
            Here's to the chapter that made us.
          </div>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-[#3c2858] dark:text-violet-200/85">
            Built with love by the juniors of 2K27, as a keepsake for every
            senior who walked these halls before us.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#5a3d7e] dark:text-violet-300/85">
            <span>© {year} Farewell 2K26 · SASI Institute · IT</span>
            <span className="h-1 w-1 rounded-full bg-[#b195cc] dark:bg-violet-200/60" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
