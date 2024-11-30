import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { FormData } from '../types'
import { useAppSelector } from '../app/hooks'
import { MdDeleteForever } from 'react-icons/md'

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../utils/firebase'

export default function CreateListing() {
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
  const [imageUploading, setImageUploading] = useState<boolean>(false)
  const [imageUploadProgress, setImageUploadProgress] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFilepaths, setImageFilePaths] = useState<string[]>([])

  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.user)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target

    // Narrowing for `checked`
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : undefined

    if (id === 'sale' || id === 'rent') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        type: id as 'rent' | 'sale',
      }))
    }

    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: checked,
      }))
    }

    if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }))
    }
  }

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const randomFileName = `${new Date().getTime()}-${file.name}`
      const storageRef = ref(
        storage,
        `user-${currentUser._id}/property-images/${randomFileName}`
      )

      // Grabbing the file path for future reference
      setImageFilePaths((prevFilepath) => [
        ...prevFilepath,
        `user-${currentUser._id}/property-images/${randomFileName}`,
      ])

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          if (progress > 0 && progress < 100) {
            setImageUploadProgress(`Upload is ${progress}% done`)
          }
          console.log(progress)
          setImageUploadProgress('')
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        }
      )
    })
  }

  const handleImageUpload = () => {
    setImageUploading(true)
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
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls),
          }))
          setImageUploadError('')
          setImageUploading(false)
        })
        .catch((err) => {
          console.error(err)
          setImageUploadError('Image upload failed (2 mb max per image)')
          setImageUploading(false)
        })
    } else {
      if (files?.length === 0) {
        setImageUploadError('No file found!')
      } else {
        setImageUploadError('You can only upload 6 images per listing')
      }
      setImageUploading(false)
    }
  }

  const handleRemoveImage = async (index: number) => {
    try {
      const storage = getStorage(app)
      const imageDeletionRef = ref(storage, `${imageFilepaths[index]}`)

      await deleteObject(imageDeletionRef)

      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
      }))

      setImageFilePaths((prevFilepath) =>
        prevFilepath.filter((_, i) => i !== index)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image')
      }

      if (Number(formData.regularPrice) < Number(formData.discountPrice)) {
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

      navigate(`/listing/${data.message._id}`)
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
            maxLength={62}
            minLength={10}
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
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

          {imageUploadProgress && (
            <p className="text-teal-500 text-sm font-medium">
              {imageUploadProgress}
            </p>
          )}

          {/* Map through the uploaded images */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between gap-8 py-3 px-4 border items-center rounded-lg"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-44 object-contain rounded-lg"
                />
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="flex items-center bg-red-500 text-white px-2 rounded-xl cursor-pointer hover:bg-red-400"
                >
                  <button
                    type="button"
                    className="p-2 font-light text-sm xl:text-base"
                  >
                    Delete
                  </button>
                  <MdDeleteForever className="w-6 h-6" />
                </div>
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
