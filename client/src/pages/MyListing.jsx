import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ClockLoader } from 'react-spinners'

const ListingCard = ({ listing, handleListingDelete }) => {
  return (
    <div className="flex items-center justify-evenly py-4 mt-4 rounded shadow-md transition duration-300 hover:scale-105 ">
      <Link
        Link
        to={`/listing/${listing._id}`}
        className="flex items-center gap-2 hover:underline"
      >
        <img
          src={listing?.imageUrls?.[0]}
          alt={listing?.name}
          className="w-20 rounded-md"
        />
        <p className="text-sm md:text-base">{listing?.name}</p>
      </Link>

      <p className="text-sm md:text-base">{listing?.type}</p>

      <p className="hidden lg:block">{listing?.createdAt}</p>

      <div className="flex items-center gap-4 p-2 rounded-md">
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
  const [loading, setLoading] = useState(false)
  const [userListings, setUserListings] = useState([])

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`)
        const data = await res.json()
        setUserListings(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchListings()
  }, [currentUser._id])

  const handleListingDelete = async (listingId) => {
    alert('Are you sure you want to delete this listing?')
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      setUserListings((prevListing) =>
        prevListing.filter((listing) => listing._id !== listingId)
      )
      console.log(data)
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
    <div className="py-4 max-w-4xl mx-auto">
      {userListings && userListings.length > 0 ? (
        <>
          <h3 className="text-xl md:text-3xl font-semibold text-center my-7 py-2">
            My Listing
          </h3>

          <div className="flex items-center justify-around p-2">
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Name
            </p>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Type
            </p>
            <p className="text-sm text-gray-400 font-medium tracking-wide hidden lg:block">
              Created at
            </p>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Modify
            </p>
          </div>
          {userListings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              handleListingDelete={handleListingDelete}
            />
          ))}
        </>
      ) : (
        <p>No Listings Available</p>
      )}
    </div>
  )
}
