import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa'
import Contact from './Contact'

// Swiper imports
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
  SwiperCore.use([Navigation])

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)

  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()

        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }

        setListing(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log(error)
      }
    }

    fetchListing()
  }, [params.listingId])

  return (
    <main className="bg-[#fffaf7]">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}

      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong.</p>
      )}

      {listing && !loading && !error && (
        <div>
          {/* Image Swiper */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Copy to clipboard */}
          <>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 2000)
                }}
              />
            </div>

            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}
          </>

          <div className="max-w-4xl mx-auto p-4 space-y-4 ">
            {/* Property Information */}
            <div className="flex flex-col my-7 gap-5 px-3 py-5 border rounded-md shadow-sm md:px-6">
              <p className="text-2xl font-semibold">
                {listing.name} - ${' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && '/month'}
              </p>

              <p className="flex items-center mt-2 gap-2 text-slate-600 text-sm">
                <FaMapMarkerAlt className="text-[#fb923c] w-5 h-5" />
                {listing.address}
              </p>

              <div className="flex gap-4">
                <p className="bg-black w-full max-w-[200px] text-white text-center p-2 rounded-md">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>

                {listing.offer && (
                  <p className="bg-red-500 w-full max-w-[200px] text-white text-center p-2 rounded-md">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>

              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>

              {/* Hightlights */}
              <ul className="text-[#fb923c] font-semibold text-sm flex flex-wrap items-center gap-4 px-3 py-5">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg w-5 h-5" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>

                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg w-5 h-5" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>

                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg w-5 h-5" />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>

                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg w-5 h-5" />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>
            </div>

            {/* Owner Information */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <div>
                <Contact listing={listing} />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
