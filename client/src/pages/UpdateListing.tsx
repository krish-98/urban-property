import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { FormData } from '../types'
import { ClipLoader } from 'react-spinners'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../utils/firebase'

export default function UpdateListing() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })
  const [imageUploadError, setImageUploadError] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const params = useParams()

  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId
      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/listing/get/${listingId}`,
        {
          credentials: 'include',
        }
      )
      const data = await res.json()

      if (data.success === false) {
        console.log(data.message)
        return
      }

      setFormData(data)
    }

    fetchListing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageSubmit = () => {
    setUploading(true)
    setImageUploadError('')

    if (
      files &&
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      const promises = []
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ...urls],
            // imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError('')
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
          console.error(err)
        })
    } else {
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false)
    }
  }

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name

      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, type, value } = e.target

    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : undefined

    if (id === 'sale' || id === 'rent') {
      setFormData({ ...formData, type: id })
    }

    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData({
        ...formData,
        [id]: checked,
      })
    }

    if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({ ...formData, [id]: value })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image')
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than the regular price')
      setLoading(true)
      setError('')

      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/listing/update/${
          params.listingId
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
          credentials: 'include',
        }
      )
      const data = await res.json()

      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      setLoading(false)
    }
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 md:mt-16 lg:gap-10"
      >
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-medium text-[#191919] lg:text-xl">
            Property Information
          </p>

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 accent-[#fca259]"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 accent-[#fca259]"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 accent-[#fca259]"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 accent-[#fca259]"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 accent-[#fca259]"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />

                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image upload section */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold lg:text-xl">Images:</p>

          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-[#fb9846] border-dashed rounded w-full cursor-pointer"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              onClick={handleImageSubmit}
              type="button"
              className="px-6 bg-[#191919] border text-white rounded-lg hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          <p className="text-red-700 text-sm font-medium">
            {imageUploadError && imageUploadError}
          </p>

          {/* Map through the uploaded images */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="p-3 text-red-700 uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="p-3 bg-[#fb923c] text-white font-semibold tracking-wide rounded-lg transition-all hover:opacity-85 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-1">
                <ClipLoader color="#ffffff" size={15} />
                <span>Updating... </span>
              </div>
            ) : (
              'Update Listing'
            )}
          </button>

          {error && <p className="text-red-700 text-sm font-medium">{error}</p>}
        </div>
      </form>
    </main>
  )
}