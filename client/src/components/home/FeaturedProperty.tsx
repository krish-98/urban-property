import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'

import ListingItem from '../ListingItem'
import { ListingProps } from '../../types'

interface ErrorState {
  offer: string | null
  rent: string | null
  sale: string | null
}

export default function FeaturedProperty() {
  const [loading, setLoading] = useState<boolean>(false)
  const [offerListings, setOfferListings] = useState<ListingProps[]>([])
  const [saleListings, setSaleListings] = useState<ListingProps[]>([])
  const [rentListings, setRentListings] = useState<ListingProps[]>([])
  const [errors, setErrors] = useState<ErrorState>({
    offer: null,
    rent: null,
    sale: null,
  })

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)

        const results = await Promise.allSettled([
          fetch(
            `${
              import.meta.env.VITE_APP_BACKEND_URL
            }/api/listing/get?offer=true&limit=3`
          ),
          fetch(
            `${
              import.meta.env.VITE_APP_BACKEND_URL
            }/api/listing/get?type=rent&limit=3`
          ),
          fetch(
            `${
              import.meta.env.VITE_APP_BACKEND_URL
            }/api/listing/get?type=sale&limit=3`
          ),
        ])

        const [offerResults, rentResults, saleResults] = results

        if (offerResults.status === 'fulfilled' && offerResults.value.ok) {
          const offerData: ListingProps[] = await offerResults.value.json()
          setOfferListings(offerData)
        } else {
          setErrors((prevErr) => ({
            ...prevErr,
            offer: 'Failed to fetch order listings.',
          }))
        }

        if (rentResults.status === 'fulfilled' && rentResults.value.ok) {
          const rentData: ListingProps[] = await rentResults.value.json()
          setRentListings(rentData)
        } else {
          setErrors((prevErr) => ({
            ...prevErr,
            rent: 'Failed to fetch rent listings.',
          }))
        }

        if (saleResults.status === 'fulfilled' && saleResults.value.ok) {
          const saleData: ListingProps[] = await saleResults.value.json()
          setSaleListings(saleData)
        } else {
          setErrors((prevErr) => ({
            ...prevErr,
            sale: 'Failed to fetch sale listings.',
          }))
        }
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-3 flex flex-col justify-center items-center gap-8 py-10 xl:gap-12 xl:px-0">
      <h3 className="font-bold text-xl lg:text-2xl">Featured Properties</h3>

      {loading ? (
        <CircleLoader size={50} color="#fb923c" />
      ) : (
        <>
          {offerListings.length > 0 ? (
            <div className="flex flex-col px-4 gap-4 xl:px-0">
              <div>
                <h2 className="lg:text-xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm font-semibold text-[#fb923c] hover:underline"
                  to={'/search?offer=true'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 xl:gap-8 xl:justify-between">
                {offerListings.map((listing: ListingProps) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          ) : (
            errors.offer && <p className="text-red-500 my-8">{errors.offer}</p>
          )}

          {rentListings.length > 0 ? (
            <div className="flex flex-col px-4 gap-4 xl:px-0">
              <div>
                <h2 className="lg:text-xl font-semibold text-slate-600">
                  Recent Rent Properties
                </h2>
                <Link
                  className="text-sm font-semibold text-[#fb923c] hover:underline"
                  to={'/search?type=rent'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 xl:gap-8 xl:justify-between">
                {rentListings.map((listing: ListingProps) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          ) : (
            errors.rent && <p className="text-red-500 my-8">{errors.rent}</p>
          )}

          {saleListings.length > 0 ? (
            <div className="flex flex-col px-4 gap-4 xl:px-0">
              <div>
                <h2 className="lg:text-xl font-semibold text-slate-600">
                  Recent Sale Properties
                </h2>
                <Link
                  className="text-sm font-semibold text-[#fb923c] hover:underline"
                  to={'/search?type=sale'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 xl:gap-8 xl:justify-between">
                {saleListings.map((listing: ListingProps) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          ) : (
            errors.sale && <p className="text-red-500 my-8">{errors.sale}</p>
          )}
        </>
      )}
    </div>
  )
}
