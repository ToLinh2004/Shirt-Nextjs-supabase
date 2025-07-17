import BannerMotion from "@/components/banner-motion";

export function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-sky-400 to-slate-600">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-oswald text-[25vw] font-black text-white opacity-10 select-none">
          MEN&apos;S
        </h1>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center p-8 md:flex-row md:items-center md:justify-between">
        <div className="mb-12 text-center text-white md:mb-0  md:w-1/2">
          <p className="font-oswald text-2xl font-bold uppercase text-red-500">
            Exclusive
          </p>
          <h2
            className="font-oswald text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-slate-800"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
          >
            Men&apos;s
          </h2>
          <p
            className="font-playfair text-6xl italic"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
          >
            Collection
          </p>
        </div>
        <div className="relative h-[400px] w-full md:w-1/2">
          <div className="relative w-full h-full">
            <BannerMotion />
          </div>
        </div>
      </div>
    </header>
  );
}
