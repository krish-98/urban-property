import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'
import House from '../assets/house.png'
import { CiSearch } from 'react-icons/ci'
import { FaEye, FaHandPaper } from 'react-icons/fa'
import { FaHouseChimneyWindow } from 'react-icons/fa6'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { FaFireAlt } from 'react-icons/fa'
import { PiMaskHappy } from 'react-icons/pi'
import { FaMapLocationDot } from 'react-icons/fa6'
import { AiOutlineDollar } from 'react-icons/ai'

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)

        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)

        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings()
  }, [])
  return (
    <>
      {/* Header */}
      <header className="bg-[#fff7f2]">
        <div className="max-w-6xl mx-auto bg-[#fff7f2] py-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="px-8 space-y-4">
            <h1 className="text-2xl font-bold lg:text-[2.5rem] leading-tight">
              <span>Find a perfect property</span>
              <br />
              <span>Where you&apos;ll love to live</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              We help businesses customize, automate and scale their ad
              production and delivery
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

      {/* Mid */}
      <section>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 my-10 md:my-16">
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
                <p className="font-semibold lg:text-lg">
                  Enjoy yout Appointment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fffaf7]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-14 xl:justify-between">
            <div className="space-y-1">
              <AiOutlineDollar size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                5.4M
              </p>
              <p className="text-slate-600 text-sm ">Owned from</p>
              <p className="text-slate-600 text-sm ">Properties tranactions</p>
            </div>
            <div className="space-y-1">
              <FaMapLocationDot size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                25k+
              </p>
              <p className="text-slate-600 text-sm ">
                Properties for Buy & Sell
              </p>
              <p className="text-slate-600 text-sm ">Successfully</p>
            </div>
            <div className="space-y-1">
              <FaFireAlt size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                500
              </p>
              <p className="text-slate-600 text-sm ">Daily completed</p>
              <p className="text-slate-600 text-sm ">tranactions</p>
            </div>
            <div className="space-y-1">
              <PiMaskHappy size={25} className="fill-[#fc670f]" />
              <p className="font-semibold text-lg md:text-xl lg:text-2xl">
                600
              </p>
              <p className="text-slate-600 text-sm ">Regular Clients</p>
              <p className="text-slate-600 text-sm "></p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <main></main>

      {/* Footer */}
      <footer>
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
    </>
  )
}

// return (
//   <div className="bg-[#fff7f2]">
//     {/* Top Section */}
//     <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
//       <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
//         Find your next <span className="text-slate-500">perfect</span>
//         <br />
//         place with ease
//       </h1>
//       <div className="text-gray-400 text-sm sm:text-sm">
//         Urban Property is the best place to find your next perfect place to
//         live.
//         <br />
//         We have a wide range of properties for you to choose from.
//       </div>
//       <Link
//         to={'/search'}
//         className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
//       >
//         Let&apos;s get started...
//       </Link>
//     </div>

//     {/* Swiper Section */}
//     <Swiper navigation>
//       {offerListings &&
//         offerListings.length > 0 &&
//         offerListings.map((listing, i) => (
//           <SwiperSlide key={i}>
//             <div
//               style={{
//                 background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                 backgroundSize: 'cover',
//               }}
//               className="h-[500px]"
//               key={listing._id}
//             ></div>
//           </SwiperSlide>
//         ))}
//     </Swiper>

//     {/* Listing results for Offer, sale and rent */}
//     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
//       {offerListings && offerListings.length > 0 && (
//         <div>
//           <div className="my-3">
//             <h2 className="text-2xl font-semibold text-slate-600">
//               Recent offers
//             </h2>
//             <Link
//               className="text-sm text-blue-800 hover:underline"
//               to={'/search?offer=true'}
//             >
//               Show more offers
//             </Link>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {offerListings.map((listing) => (
//               <ListingItem listing={listing} key={listing._id} />
//             ))}
//           </div>
//         </div>
//       )}

//       {rentListings && rentListings.length > 0 && (
//         <div>
//           <div className="my-3">
//             <h2 className="text-2xl font-semibold text-slate-600">
//               Recent offers
//             </h2>
//             <Link
//               className="text-sm text-blue-800 hover:underline"
//               to={'/search?offer=true'}
//             >
//               Recent places for rent
//             </Link>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {rentListings.map((listing) => (
//               <ListingItem listing={listing} key={listing._id} />
//             ))}
//           </div>
//         </div>
//       )}

//       {saleListings && saleListings.length > 0 && (
//         <div>
//           <div className="my-3">
//             <h2 className="text-2xl font-semibold text-slate-600">
//               Recent offers
//             </h2>
//             <Link
//               className="text-sm text-blue-800 hover:underline"
//               to={'/search?offer=true'}
//             >
//               Show more offers
//             </Link>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {saleListings.map((listing) => (
//               <ListingItem listing={listing} key={listing._id} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )
