import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropertyInfo from '../components/PropertyInfo'
import CopyToClipboard from '../components/CopyToClipboard'
import Contact from './Contact'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { currentUser } = useSelector((state) => state.user)
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/listing/get/${params?.listingId}`)
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
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <CopyToClipboard />

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
