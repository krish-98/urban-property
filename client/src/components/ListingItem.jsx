import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { FaBath, FaBed } from 'react-icons/fa'

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="group">
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover group-hover:scale-105 transistion-scale duration-300"
        />

        <div className="p-5 flex flex-col justify-between gap-2">
          <p className="truncate lg:text-lg font-semibold text-wrap text-slate-700">
            {listing.name}
          </p>

          <div className="flex items-center gap-1 py-1">
            <MdLocationOn className="h-5 w-5 text-black" />
            <p className="text-sm text-gray-600 truncate text-wrap w-full">
              {listing.address}
            </p>
          </div>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs flex items-center gap-1">
              <FaBed className="w-5 h-5" />
              {listing.bedrooms > 1 ? (
                <span>{`${listing.bedrooms} beds `}</span>
              ) : (
                <span> {`${listing.bedrooms} bed`} </span>
              )}
            </div>

            <div className="font-bold text-xs flex items-center gap-1">
              <FaBath className="w-5 h-5" />

              {listing.bathrooms > 1 ? (
                <span>{`${listing.bathrooms} baths`}</span>
              ) : (
                <span>{`${listing.bathrooms} bath`}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between my-3 gap-2 font-semibold text-sm">
            <Link
              to={`/listing/${listing._id}`}
              className=" bg-black text-white py-3 px-4 rounded-lg transition duration-500 hover:shadow-xl"
            >
              View Details
            </Link>

            <p className="text-black text-lg">
              ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && '/month'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
