import { Link } from 'react-router-dom'
import { ListingProps } from '../../types'
import { MdModeEdit, MdDelete } from 'react-icons/md'

export const ListingCard = ({
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
