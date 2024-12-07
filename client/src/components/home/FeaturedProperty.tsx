import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'

import ListingItem from '../ListingItem'
import { ListingProps } from '../../types'

export default function FeaturedProperty() {
  const [loading, setLoading] = useState<boolean>(false)
  const [offerListings, setOfferListings] = useState<ListingProps[]>([])
  const [saleListings, setSaleListings] = useState<ListingProps[]>([])
  const [rentListings, setRentListings] = useState<ListingProps[]>([])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/api/listing/get?offer=true&limit=3`
        )

        if (!res.ok) throw new Error('Network error occured!')

        const data: ListingProps[] = await res.json()
        setOfferListings(data)

        fetchRentListings()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/api/listing/get?type=rent&limit=3`
        )

        if (!res.ok) throw new Error('Network error occured!')

        const data: ListingProps[] = await res.json()
        setRentListings(data)

        fetchSaleListings()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/api/listing/get?type=sale&limit=3`
        )

        if (!res.ok) throw new Error('Network error occured!')

        const data: ListingProps[] = await res.json()
        setSaleListings(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOfferListings()
  }, [])

  return (
    <main>
      <div className="max-w-6xl mx-auto p-3 flex flex-col justify-center items-center gap-8 my-10 xl:gap-12">
        <h3 className="font-bold text-xl lg:text-2xl">Featured Properties</h3>

        {loading ? (
          <CircleLoader size={50} color="#fb923c" />
        ) : (
          <>
            {offerListings && offerListings.length > 0 && (
              <div className="flex flex-col px-4 gap-4">
                <div className="">
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
            )}

            {rentListings && rentListings.length > 0 && (
              <div className="flex flex-col px-4 gap-4">
                <div className="">
                  <h2 className="lg:text-xl font-semibold text-slate-600">
                    Recent Rent Properties
                  </h2>
                  <Link
                    className="text-sm font-semibold text-[#fb923c] hover:underline"
                    to={'/search?offer=true'}
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
            )}

            {saleListings && saleListings.length > 0 && (
              <div className="flex flex-col px-4 gap-4">
                <div className="">
                  <h2 className="lg:text-xl font-semibold text-slate-600">
                    Recent Sale Properties
                  </h2>
                  <Link
                    className="text-sm font-semibold text-[#fb923c] hover:underline"
                    to={'/search?offer=true'}
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
            )}
          </>
        )}
      </div>
    </main>
  )
}
