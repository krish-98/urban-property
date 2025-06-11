import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearchLocation } from 'react-icons/fa'
import House from '../../assets/house.png'

export default function Hero() {
  return (
    <main className="bg-mainColor">
      <div className="max-w-6xl mx-auto bg-mainColor py-16 flex flex-col md:flex-row gap-8 items-center lg:py-32">
        <div className="px-8 xl:px-0 xl:flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold lg:text-[2.5rem] leading-tight">
            <span>Find a perfect property</span>
            <br />
            <span>Where you&apos;ll love to live</span>
          </h1>
          <div>
            <p className="text-slate-600 text-xs tracking-wide md:text-base">
              We help connecting customer and owner to find the perpect
              property.
            </p>
            <p className="text-slate-600 text-xs tracking-wide md:text-base">
              What you are looking for is one search away.
            </p>
          </div>
          <motion.div whileTap={{ scaleY: 0.8 }}>
            <Link
              to={'/search'}
              className="bg-black text-white text-sm mt-2 px-2.5 py-2 md:p-3 lg:px-5 lg:py-3.5 rounded-lg hover:bg-slate-900 flex items-center gap-2 w-fit"
            >
              <span>Find your search</span>
              <FaSearchLocation />
            </Link>
          </motion.div>
        </div>

        <div className="xl:flex-1">
          <img
            src={House}
            alt="house"
            className="w-[800px] object-contain brightness-150 rounded-br-full md:rounded-bl-full md:rounded-br-none"
          />
        </div>
      </div>
    </main>
  )
}
