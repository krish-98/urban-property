import { AiOutlineDollar } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { FaEye, FaFireAlt } from 'react-icons/fa'
import { FaHouseChimneyWindow, FaMapLocationDot } from 'react-icons/fa6'
import { PiMaskHappy } from 'react-icons/pi'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <div className="bg-[#fff7f2]">
        <div className="py-20 px-4 lg:px-0 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            About Urban Property
          </h1>
          <p className="mb-4 text-slate-600 line-clamp-4">
            <span className="font-medium">
              <span className="text-[#fb923c]">Urban</span>
              <span> Property </span>
            </span>
            is a leading real estate agency that specializes in helping clients
            buy, sell, and rent properties in the most desirable neighborhoods.
            Our team of experienced agents is dedicated to providing exceptional
            service and making the buying and selling process as smooth as
            possible.
          </p>
          <p className="mb-4 text-slate-600">
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
          </p>
          <p className="mb-4 text-slate-600">
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>
      </div>

      <section>
        <div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:px-8 lg:gap-16 py-20 xl:justify-between">
            <div className="space-y-1 w-[200px] h-[150px]">
              <AiOutlineDollar size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                5.4M
              </p>
              <p className="text-slate-600 text-sm ">Owned from</p>
              <p className="text-slate-600 text-sm ">Properties tranactions</p>
            </div>

            <div className="space-y-1 w-[200px] h-[150px]">
              <FaMapLocationDot size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                25k+
              </p>
              <p className="text-slate-600 text-sm ">
                Properties for Buy & Sell
              </p>
              <p className="text-slate-600 text-sm ">Successfully</p>
            </div>

            <div className="space-y-1 w-[200px] h-[150px]">
              <FaFireAlt size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                500
              </p>
              <p className="text-slate-600 text-sm ">Daily completed</p>
              <p className="text-slate-600 text-sm ">transactions</p>
            </div>

            <div className="space-y-1 w-[200px] h-[150px]">
              <PiMaskHappy size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                600
              </p>
              <p className="text-slate-600 text-sm">Regular Clients</p>
              <p className="text-slate-600 text-sm"></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#fff7f2]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center py-20 gap-10 px-10">
          <div className="space-y-1 w-[300px] h-[200px]">
            <Link to="/">
              <h1 className="font-bold text-sm sm:text-xl flex flex-wrap space-x-0.5 text-center">
                <span className="text-[#fb923c]">Urban</span>
                <span className="text-[#191919]">Property</span>
              </h1>
            </Link>
            <p>59 Bervely Hill Ave. Brooklyn Town,</p>
            <p> New York, NY 5630, CA, US</p>
            <p>+(123) 456-7890</p>
            <p>urbanproperty@gmail.com</p>
          </div>

          <div className="space-y-1 w-[300px] h-[200px]">
            <h3 className="font-semibold">Features</h3>
            <p>Home</p>
            <p>Apartments</p>
            <p>About</p>
            <p>Contact</p>
          </div>

          <div className="space-y-1 w-[300px] h-[200px]">
            <h3 className="font-semibold">Information</h3>
            <p>Listings v1</p>
            <p>Listings v2</p>
            <p>Property Details</p>
            <p>Profile</p>
          </div>

          <div className="space-y-1 w-[300px] h-[200px]">
            <h3 className="font-semibold">Documentation</h3>
            <p>Blog</p>
            <p>FAQ</p>
            <p>Privacy Policy</p>
            <p>License</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
