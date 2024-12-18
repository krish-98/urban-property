import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../utils/firebase'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
} from '../app/features/user/userSlice'

import { ClipLoader } from 'react-spinners'
import { IoCameraReverse } from 'react-icons/io5'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { MdFolderDelete } from 'react-icons/md'

interface FormData {
  username?: string
  email?: string
  password?: string
  avatar?: string
}

export default function Profile() {
  const [file, setFile] = useState<File | null>(null)
  const [filePercentage, setFilePercentage] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [filePath, setFilePath] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({})

  const fileRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useAppDispatch()
  const { currentUser, loading, error } = useAppSelector((store) => store.user)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.id]: e.target.value,
    }))
  }

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app)
    const randomFileName = `${new Date().getTime()}-${file.name}`
    const storageRef = ref(
      storage,
      `user-${currentUser._id}/profile-images/${randomFileName}`
    )
    const uploadTask = uploadBytesResumable(storageRef, file)

    setFilePath(`user-${currentUser._id}/profile-images/${randomFileName}`)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
        console.error('File upload error:', error.message)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadURL,
          }))

          toast.success('Image uploaded successfully!')

          setTimeout(() => setFilePercentage(0), 3000)
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Error fetching download URL:', error.message)
          } else {
            console.error('Error fetching download URL:', error)
          }
        }
      }
    )
  }

  const handleDeleteImage = async () => {
    try {
      const storage = getStorage(app)
      const deletImageRef = ref(storage, filePath)

      await deleteObject(deletImageRef)
      toast.success('Image deleted successfully!')

      setFile(null)
      setFilePath('')
      setFormData((prevFormData) => ({ ...prevFormData, avatar: '' }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())

      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/update/${
          currentUser._id
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        }
      )
      const data = await res.json()

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      toast.success('Account updated successfully!', {
        position: 'bottom-right',
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message))
      } else {
        console.error(
          'An unexpected error occurred during save changes:',
          error
        )
        dispatch(updateUserFailure('An unexpected error occurred'))
      }
    }
  }

  const handleDeleteAccount = async () => {
    const confirmDialog = confirm('Are you want to delete your account?')

    try {
      if (confirmDialog) {
        dispatch(deleteUserSuccess())
        const res = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/delete/${
            currentUser._id
          }`,
          {
            method: 'DELETE',
            credentials: 'include',
          }
        )
        const data = await res.json()
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message))
          return
        }
        dispatch(deleteUserSuccess(data))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(deleteUserFailure(error.message))
      } else {
        console.error(
          'An unexpected error occurred during account deletion:',
          error
        )
        dispatch(deleteUserFailure('An unexpected error occurred'))
      }
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto pt-28">
      <form
        onSubmit={handleSaveChanges}
        className="flex flex-col items-center gap-4 relative"
      >
        {/* User profile and upload btn */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <input
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              type="file"
              ref={fileRef}
              accept="image/*"
              hidden
            />
            <img
              className="rounded-full h-28 w-28 object-cover cursor-pointer"
              src={formData?.avatar || currentUser?.avatar}
              alt="user-profile"
            />
            <IoCameraReverse
              title="Upload Image"
              className="w-6 h-6 absolute right-0 bottom-[0.5px]"
            />
          </div>

          {/* Delete Image Icon */}
          {filePath && formData?.avatar && (
            <MdFolderDelete
              onClick={handleDeleteImage}
              title="Delete Image"
              className="w-6 h-6 absolute -right-8 bottom-[0.5px] fill-red-500"
            />
          )}
        </div>

        <p className="text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (Image must be less than 2MB)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">
              {'Image successfully uploaded'}
            </span>
          ) : (
            ''
          )}
        </p>

        <p className="text-sm text-red-700 font-medium">{error && error}</p>

        <div className="space-y-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="pl-1 text-sm md:text-base font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="border p-3 ml-1 text-sm md:text-base rounded-lg focus:outline-2 focus:outline-[#fb923c]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="pl-1 text-sm md:text-base font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="border p-3 ml-1 text-sm md:text-base rounded-lg focus:outline-2 focus:outline-[#fb923c]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="pl-1 text-sm md:text-base font-medium">
              Change Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="border p-3 ml-1 text-sm md:text-base rounded-lg focus:outline-2 focus:outline-[#fb923c]"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-[#191919]  w-full text-sm md:text-base text-white font-medium tracking-wider rounded-lg p-3 my-2 hover:opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-gray-800"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              <ClipLoader color="#fff" size={15} />
              <span>Saving...</span>
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>

      {/* Delete user button */}
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="flex justify-center items-center mt-5 bg-red-600 w-full p-3 rounded-md gap-1 hover:bg-red-500 disabled:cursor-not-allowed"
      >
        <RiDeleteBin2Fill className="fill-white w-5 h-5" />
        <span className="text-white font-medium">Delete account</span>
      </button>
    </div>
  )
}
