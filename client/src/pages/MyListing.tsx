import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

import { ClockLoader } from 'react-spinners'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { GiNothingToSay } from 'react-icons/gi'
import { ListingProps } from '../types'

const ListingCard = ({
  listing,
  handleListingDelete,
}: {
  listing: ListingProps
  handleListingDelete: (id: string) => Promise<void>
}) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 justify-center items-center p-6 rounded-md shadow-lg transition duration-700 hover:scale-[1.03]">
      <Link
        to={`/listing/${listing._id}`}
        className="flex items-center gap-2 hover:underline"
      >
        <img
          src={listing?.imageUrls?.[0]}
          alt={listing?.name}
          className="w-20 rounded-md"
        />
        <p className="text-sm text-center truncate md:text-base ">
          {listing?.name}
        </p>
      </Link>

      <p className="text-sm text-center md:text-base">{listing?.type}</p>

      <p className="hidden lg:block text-center">
        {new Date(listing?.createdAt)?.toLocaleDateString()}
      </p>

      <div className="flex items-center justify-center gap-4 p-2 rounded-md">
        <Link to={`/update-listing/${listing._id}`}>
          <MdModeEdit
            className="w-5 h-5 fill-orange-500 cursor-pointer"
            title="Edit"
          />
        </Link>

        <MdDelete
          onClick={() => handleListingDelete(listing._id)}
          title="Delete"
          className="w-5 h-5 fill-red-500 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default function MyListing() {
  const [loading, setLoading] = useState<boolean>(false)
  const [userListings, setUserListings] = useState<ListingProps[]>([])

  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`)
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
