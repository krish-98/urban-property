import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PropertyInfo from '../components/PropertyInfo'
import CopyToClipboard from '../components/CopyToClipboard'
import Contact from './Contact'

import { useAppSelector } from '../app/hooks'
import { ListingProps } from '../types'

// Swiper imports
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/navigation'

export default function Listing() {
  const [listing, setListing] = useState<ListingProps | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { currentUser } = useAppSelector((state) => state.user)
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/listing/get/${
            params?.listingId
          }`
        )
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
        console.log(error)
        console.error('Error fetching listing:', error)
      }
    }

    fetchListing()
  }, [params.listingId])

  return (
    <main className="bg-[#fffaf7]">
      {loading && (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
          <p className="text-center my-7 text-2xl bg-white animate-pulse">
            Loading...
          </p>
        </div>
      )}
      {error && (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
          <p className="text-center my-7 text-2xl bg-white">
            Something went wrong!
          </p>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper modules={[Navigation]} navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] relative"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                >
                  <CopyToClipboard />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="max-w-4xl mx-auto p-4 space-y-4 pb-14">
            <PropertyInfo listing={listing} />

            {currentUser?._id !== listing?.userRef?._id && (
              <Contact listing={listing} />
            )}
          </div>
        </div>
      )}
    </main>
  )
}
