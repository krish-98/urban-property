import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa'

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transistion-scale duration-300"
        />

        <div className="p-3">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-5 w-5 text-black" />
            <p className="text-sm text-gray-600 truncate w-full">
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

          <p className="text-slate-500 mt-2 font-semibold">
            ${' '}
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
        </div>
      </Link>
    </div>
  )
}
