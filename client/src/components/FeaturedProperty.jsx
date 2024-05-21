import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import { CircleLoader } from 'react-spinners'

export default function FeaturedProperty() {
  const [loading, setLoading] = useState(false)
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/listing/get?offer=true&limit=3')
        const data = await res.json()
        setOfferListings(data)

        fetchRentListings()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3')
        const data = await res.json()
        setRentListings(data)

        fetchSaleListings()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=3')
        const data = await res.json()
        setSaleListings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchOfferListings()
  }, [])

  return (
    <main>
      <div className="max-w-6xl mx-auto p-3 flex flex-col justify-center items-center gap-8 my-10 px-6">
        <h3 className="text-2xl font-bold">Feaured Properties</h3>

        {loading ? (
          <CircleLoader size={50} color="#fb923c" className="" />
        ) : (
          <>
            {offerListings && offerListings.length > 0 && (
              <div>
                <div className="my-2">
                  <h2 className="text-xl font-semibold text-slate-600">
                    Recent offers
                  </h2>
                  <Link
                    className="text-sm font-semibold text-[#fb923c] hover:underline"
                    to={'/search?offer=true'}
                  >
                    Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 xl:justify-between">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {rentListings && rentListings.length > 0 && (
              <div>
                <div className="my-2">
                  <h2 className="text-xl font-semibold text-slate-600">
                    Recent Rent Properties
                  </h2>
                  <Link
                    className="text-sm font-semibold text-[#fb923c] hover:underline"
                    to={'/search?offer=true'}
                  >
                    Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 xl:justify-between">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {saleListings && saleListings.length > 0 && (
              <div>
                <div className="my-2">
                  <h2 className="text-xl font-semibold text-slate-600">
                    Recent Sale Properties
                  </h2>
                  <Link
                    className="text-sm font-semibold text-[#fb923c] hover:underline"
                    to={'/search?offer=true'}
                  >
                    Show more
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 xl:justify-between">
                  {saleListings.map((listing) => (
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
