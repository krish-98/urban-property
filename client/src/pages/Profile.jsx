import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../app/features/user/userSlice'
import { IoCameraReverse } from 'react-icons/io5'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { ClipLoader } from 'react-spinners'

export default function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState(false)

  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector((store) => store.user)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleChange = (e) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.id]: e.target.value,
    }))
  }

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name // Unique name for the file. Incase, if the user uploads the same file twice
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    )
  }

  const handleSubmitChanges = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteAccount = async () => {
    alert('Are you want to delete your account?')

    try {
      dispatch(deleteUserSuccess())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto pt-28">
      <form onSubmit={handleSubmitChanges} className="flex flex-col gap-4">
        {/* User profile and upload btn */}
        <div
          className="self-center relative cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          <input
            onChange={(e) => setFile(e.target.files[0])}
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
          <IoCameraReverse className="w-6 h-6 absolute right-0 bottom-[0.5px]" />
        </div>

        <p className="text-sm self-center">
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

        <p className="text-sm self-center text-red-700 font-medium">
          {error && error}
        </p>

        <div className="space-y-4">
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
          className="bg-[#191919] text-sm md:text-base text-white font-medium tracking-wider rounded-lg p-3 my-2 hover:opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-gray-800"
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
