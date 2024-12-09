import { CiSearch } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import { FaHouseChimneyWindow } from 'react-icons/fa6'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { FaFireAlt } from 'react-icons/fa'
import { PiMaskHappy } from 'react-icons/pi'
import { FaMapLocationDot } from 'react-icons/fa6'
import { AiOutlineDollar } from 'react-icons/ai'

export default function Achievements() {
  return (
    <section>
      <div className="bg-[#fffaf7]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:px-8 lg:gap-16 py-14 xl:justify-between xl:px-0">
          <div className="space-y-1 w-[200px] h-[150px]">
            <AiOutlineDollar size={25} className="fill-[#fc670f]" />
            <p className="font-semibold text-lg md:text-xl lg:text-2xl">5.4M</p>
            <p className="text-slate-600 text-sm ">Owned from</p>
            <p className="text-slate-600 text-sm ">Properties tranactions</p>
          </div>

          <div className="space-y-1 w-[200px] h-[150px]">
            <FaMapLocationDot size={25} className="fill-[#fc670f]" />
            <p className="font-semibold text-lg md:text-xl lg:text-2xl">25k+</p>
            <p className="text-slate-600 text-sm ">Properties for Buy & Sell</p>
            <p className="text-slate-600 text-sm ">Successfully</p>
          </div>

          <div className="space-y-1 w-[200px] h-[150px]">
            <FaFireAlt size={25} className="fill-[#fc670f]" />
            <p className="font-semibold text-lg md:text-xl lg:text-2xl">500</p>
            <p className="text-slate-600 text-sm ">Daily completed</p>
            <p className="text-slate-600 text-sm ">transactions</p>
          </div>

          <div className="space-y-1 w-[200px] h-[150px]">
            <PiMaskHappy size={25} className="fill-[#fc670f]" />
            <p className="font-semibold text-lg md:text-xl lg:text-2xl">600</p>
            <p className="text-slate-600 text-sm">Regular Clients</p>
            <p className="text-slate-600 text-sm"></p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-10 md:py-16">
          <div className="bg-[#ffe0ce] text-black py-16 pl-8 pr-16 rounded-xl space-y-4 lg:space-y-7 md:py-24">
            <h1 className="font-semibold text-xl lg:text-3xl">
              <span>Simple & easy way to find</span>
              <br />
              <span>your dream Appointment</span>
            </h1>
            <button className="bg-black text-white p-3 rounded-lg">
              Get started
            </button>
          </div>

          <div className="flex md:flex-col gap-4 justify-between">
            <div className="bg-[#faebe4] text-black py-8 px-4 rounded-xl w-[160px] lg:w-[200px] h-[160px] space-y-2">
              <CiSearch className="fill-[#fc670f]" size={25} />
              <p className="font-semibold lg:text-lg">Seach your Location</p>
            </div>
            <div className="bg-[#faebe4] text-black py-8 px-4 rounded-xl w-[160px] lg:w-[200px] h-[160px] space-y-2">
              <FaHouseChimneyWindow className="fill-[#fc670f]" size={25} />
              <p className="font-semibold lg:text-lg">Get your dream house</p>
            </div>
          </div>

          <div className="flex md:flex-col gap-4 justify-between">
            <div className="bg-[#faebe4] text-black py-8 px-4 rounded-xl w-[160px] lg:w-[200px] h-[160px] space-y-2">
              <FaEye className="fill-[#fc670f]" size={25} />
              <p className="font-semibold lg:text-lg">Visit Appointment</p>
            </div>
            <div className="bg-[#faebe4] text-black py-8 px-4 rounded-xl w-[160px] lg:w-[200px] h-[160px] space-y-2">
              <RiEmotionHappyLine className="fill-[#fc670f]" size={25} />
              <p className="font-semibold lg:text-lg">Enjoy yout Appointment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
