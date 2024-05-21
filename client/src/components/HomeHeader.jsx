import House from '../assets/house.png'

export default function HomeHeader() {
  return (
    <header className="bg-[#fff7f2]">
      <div className="max-w-6xl mx-auto bg-[#fff7f2] py-16 flex flex-col md:flex-row gap-8 items-center lg:py-32">
        <div className="px-8 space-y-4">
          <h1 className="text-2xl font-bold lg:text-[2.5rem] leading-tight">
            <span>Find a perfect property</span>
            <br />
            <span>Where you&apos;ll love to live</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            We help businesses customize, automate and scale their ad production
            and delivery
          </p>
          <div className="my-8 space-y-4 text-slate-600">
            <p> What you looking for is one search away</p>
            <button className="bg-black text-white p-4 rounded-lg ">
              Find your search
            </button>
          </div>
        </div>

        <div>
          <img
            src={House}
            alt="house"
            className="w-[800px] object-contain brightness-150 rounded-br-full md:rounded-bl-full md:rounded-br-none"
          />
        </div>
      </div>
    </header>
  )
}
