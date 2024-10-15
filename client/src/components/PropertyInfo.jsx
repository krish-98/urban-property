import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa'

export default function PropertyInfo({ listing }) {
  return (
    <div className="flex flex-col my-7 gap-6 px-6 py-8 border rounded-md md:px-10">
      <p className="text-2xl font-semibold">
        {listing.name} - ${' '}
        {listing.offer
          ? listing.discountPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}
        {listing.type === 'rent' && '/month'}
      </p>

      <p className="flex items-center gap-2 text-slate-600 text-sm">
        <FaMapMarkerAlt className="text-[#fb923c] w-5 h-5" />
        {listing.address}
      </p>

      <div className="flex gap-4">
        <p className="bg-black w-full max-w-[200px] text-white text-center p-2 rounded-md">
          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
        </p>

        {listing.offer && (
          <p className="bg-red-500 w-full max-w-[200px] text-white text-center p-2 rounded-md">
            ${+listing.regularPrice - +listing.discountPrice} OFF
          </p>
        )}
      </div>

      <p className="text-slate-800 text-justify max-md:text-sm">
        <span className="font-semibold text-black">Description - </span>
        {listing.description}
      </p>

      {/* Hightlights */}
      <ul className="text-[#fb923c] font-semibold text-sm flex flex-wrap items-center gap-4 px-3 py-5">
        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaBed className="text-lg w-5 h-5" />
          {listing.bedrooms > 1
            ? `${listing.bedrooms} beds `
            : `${listing.bedrooms} bed `}
        </li>

        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaBath className="text-lg w-5 h-5" />
          {listing.bathrooms > 1
            ? `${listing.bathrooms} baths `
            : `${listing.bathrooms} bath `}
        </li>

        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaParking className="text-lg w-5 h-5" />
          {listing.parking ? 'Parking spot' : 'No Parking'}
        </li>

        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaChair className="text-lg w-5 h-5" />
          {listing.furnished ? 'Furnished' : 'Unfurnished'}
        </li>
      </ul>
    </div>
  )
}
