import { useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../utils/firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

export default function CreateListing() {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
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
  const [imageUploadError, setImageUploadError] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData((prevFormData) => ({ ...prevFormData, type: e.target.id }))
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.id]: e.target.checked,
      }))
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.id]: e.target.value,
      }))
    }
  }

  const storeImage = async (file) => {
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

  const handleImageUpload = () => {
    setImageUploading(true)
    setImageUploadError(false)

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = []
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setImageUploading(false)
        })
        .catch((err) => {
          console.error(err)
          setImageUploadError('Image upload failed (2 mb max per image)')
          setImageUploading(false)
        })
    } else {
      files.length === 0
        ? setImageUploadError('No file found!')
        : setImageUploadError('You can only upload 6 images per listing')
      setImageUploading(false)
    }
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image')
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError('Discount price must be lower than the regular price')
      }

      setLoading(true)
      setError('')

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      })
      const data = await res.json()

      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }

      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto lg:p-0">
      <h1 className="text-xl md:text-3xl font-semibold text-center my-7">
        Create a Listing
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
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex items-center gap-6 flex-wrap mb-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-4 accent-[#fca259]"
                checked={formData.type === 'sale'}
                onChange={handleChange}
              />
              <label>Sell</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-4 accent-[#fca259]"
                checked={formData.type === 'rent'}
                onChange={handleChange}
              />
              <label>Rent</label>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap mb-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-4 accent-[#fca259]"
                checked={formData.parking}
                onChange={handleChange}
              />
              <label>Parking spot</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-4 accent-[#fca259]"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <label>Furnished</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-4 accent-[#fca259]"
                checked={formData.offer}
                onChange={handleChange}
              />
              <label>Offer</label>
            </div>
          </div>

          {/* Property Features */}
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <label>Beds</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <label>Baths</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <label>Regular price</label>
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
                  value={formData.discountPrice}
                  onChange={handleChange}
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
              disabled={imageUploading}
              onClick={handleImageUpload}
              type="button"
              className="px-6 bg-[#191919] text-white rounded-lg hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-300"
            >
              {imageUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm font-medium">
              {imageUploadError}
            </p>
          )}

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
            disabled={loading || imageUploading}
            className="p-3 bg-[#fb923c] text-white font-semibold tracking-wide rounded-lg transition-all hover:opacity-85 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-1">
                <ClipLoader color="#ffffff" size={15} />
                <span>Creating... </span>
              </span>
            ) : (
              'Create Listing'
            )}
          </button>

          {error && <p className="text-red-700 text-sm font-medium">{error}</p>}
        </div>
      </form>
    </main>
  )
}
