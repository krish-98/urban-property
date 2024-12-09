import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { ListingCard } from '../components/listing/ListingCard'
import { ListingProps } from '../types'

import { ClockLoader } from 'react-spinners'
import { GiNothingToSay } from 'react-icons/gi'

export default function MyListing() {
  const [loading, setLoading] = useState<boolean>(false)
  const [userListings, setUserListings] = useState<ListingProps[]>([])

  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/user/listings/${currentUser?._id}`, {
          credentials: 'include',
        })
        const data: ListingProps[] = await res.json()

        setUserListings(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [currentUser._id])

  const handleListingDelete = async (listingId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return

    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await res.json()

      setUserListings((prevListing) =>
        prevListing.filter((listing) => listing._id !== listingId)
      )
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <ClockLoader color="#fb923c" className="text-center" />
          <p className="text-[#fb923c] font-medium text-xl">
            Fetching listing...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 max-w-5xl mx-auto">
      {userListings && userListings?.length === 0 ? (
        <div className="h-[calc(100vh-96px)] flex items-center justify-center gap-2 text-[#f9913c]">
          <p className="text-xl font-semibold tracking-wider">
            No Listings Available
          </p>
          <GiNothingToSay size={40} />
        </div>
      ) : (
        <div className="px-4">
          <h3 className="text-xl md:text-3xl font-semibold text-center my-7 py-2">
            My Listing
          </h3>

          <div className="grid grid-cols-3 lg:grid-cols-4 justify-center items-center">
            <p className="text-sm text-center text-slate-400 font-medium tracking-wide">
              Name
            </p>
            <p className="text-sm text-center text-slate-400 font-medium tracking-wide">
              Type
            </p>
            <p className="text-sm text-center text-slate-400 font-medium tracking-wide hidden lg:block">
              Created at
            </p>
            <p className="text-sm text-center text-slate-400 font-medium tracking-wide">
              Modify
            </p>
          </div>

          <div className="space-y-8 mt-4">
            {userListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                handleListingDelete={handleListingDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
