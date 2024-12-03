import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

import { FaSearch } from 'react-icons/fa'
import { ListingProps, SearchData } from '../types'

export default function Search() {
  const [searchData, setSearchData] = useState<SearchData>({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [listings, setListings] = useState<ListingProps[]>([])
  const [showMore, setShowMore] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || '',
        type: (typeFromUrl as 'all' | 'rent' | 'sale') || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: (orderFromUrl as 'asc' | 'desc') || 'desc',
      })
    }

    const fetchListings = async () => {
      try {
        setLoading(true)
        setShowMore(false)
        const searchQuery = urlParams.toString()
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/api/listing/get?${searchQuery}`
        )
        const data = await res.json()

        if (data.length > 8) {
          setShowMore(true)
        } else {
          setShowMore(false)
        }

        setListings(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, checked } = e.target as HTMLInputElement

    if (id === 'searchTerm') {
      setSearchData({ ...searchData, searchTerm: value })
    }

    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSearchData({ ...searchData, type: id })
    }

    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSearchData({
        ...searchData,
        [id]: checked,
      })
    }

    if (id === 'sort_order') {
      const sort = value.split('_')[0] || 'created_at'
      const order = value.split('_')[1] || 'desc'

      setSearchData({ ...searchData, sort, order: order as 'asc' | 'desc' })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', searchData.searchTerm)
    urlParams.set('type', searchData.type)
    urlParams.set('parking', String(searchData.parking))
    urlParams.set('furnished', String(searchData.furnished))
    urlParams.set('offer', String(searchData.offer))
    urlParams.set('sort', searchData.sort)
    urlParams.set('order', searchData.order)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('startIndex', String(startIndex))
    const searchQuery = urlParams.toString()

    const res = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/listing/get?${searchQuery}`
    )
    const data = await res.json()

    if (data.length > 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <div className="bg-[#fffaf7]">
      <div className="max-w-6xl mx-auto p-4">
        <div>
          <h2 className="font-semibold my-4 md:text-xl lg:text-2xl">
            Find Property
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 text-sm lg:text-base"
          >
            {/* Search field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={searchData.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap gap-6 md:justify-center">
              {/* Type */}
              <div className="flex gap-3 flex-wrap items-center">
                <label className="font-semibold">Type:</label>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="all"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.type === 'all'}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Rent & Sale</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.type === 'rent'}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Rent </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.type === 'sale'}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Sale</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.offer}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Offer</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex gap-2 flex-wrap items-center">
                <label className="font-semibold">Amenities:</label>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.parking}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Parking</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5 accent-[#fb923c]"
                    checked={searchData.furnished}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700">Furnished</span>
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="font-semibold">Sort:</label>

                <select
                  onChange={handleChange}
                  defaultValue={'created_at_desc'}
                  id="sort_order"
                  className="border rounded-lg p-3"
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>

              <button className="flex items-center justify-center gap-1 bg-black font-semibold tracking-wider text-white p-3 rounded-lg hover:opacity-95">
                <span>Search</span>
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="pt-4">
          <h1 className="text-xl font-semibold text-slate-700 my-6">
            Listing results:
          </h1>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {!loading && listings?.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}

            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading &&
              listings &&
              listings?.map((listing) => (
                <ListingItem key={listing?._id} listing={listing} />
              ))}
          </div>

          {showMore && (
            <button
              className="text-[#fb923c] hover:underline p-7 text-center w-full"
              onClick={handleShowMore}
            >
              Show more
            </button> //You’ve reached the end of the list
          )}
        </div>
      </div>
    </div>
  )
}
