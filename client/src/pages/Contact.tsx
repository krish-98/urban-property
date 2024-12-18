import { ChangeEvent, MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListingProps } from '../types'
import { useAppSelector } from '../app/hooks'

export default function Contact({ listing }: { listing: ListingProps }) {
  const [message, setMessage] = useState<string>('')

  const { currentUser } = useAppSelector((state) => state.user)

  const { userRef: landlord } = listing

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e: MouseEvent<HTMLAnchorElement>) => {
    if (message.length < 10) {
      e.preventDefault()
      alert(
        'Your messsage is less than 10 characters. Type something meaningful ✌🏼'
      )
    }
  }
  return (
    <>
      {landlord && (
        <div className="border rounded-xl shadow-md shadow-ubOrange p-6 lg:p-10">
          <h4 className="text-lg lg:text-xl font-semibold w-full">
            Owner Information
          </h4>
          <div className="flex flex-col lg:flex-row items-start md:items-center md:justify-between gap-4 lg:mt-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <img
                  src={landlord?.avatar}
                  alt={landlord?.username}
                  referrerPolicy="no-referrer"
                  className="rounded-lg w-24"
                />
                <div className="flex flex-col gap-1">
                  <h6 className="capitalize text-sm tracking-wide font-semibold md:text-base">
                    {landlord?.username}
                  </h6>
                  {currentUser && (
                    <p className="text-sm text-gray-500 md:text-base">
                      {landlord?.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!currentUser ? (
              <Link
                to={'/sign-in'}
                className="bg-ubOrange text-white text-center font-semibold px-4 py-2 md:py-3 lg:py-4 rounded-xl hover:scale-105 hover:bg-black transition-all duration-300 w-full"
              >
                Sign in to contact
              </Link>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <p className="text-sm lg:text-base text-gray-500">
                  Contact{' '}
                  <span className="text-ubOrange font-semibold capitalize">
                    {landlord.username}
                  </span>{' '}
                  for{' '}
                  <span className="text-ubOrange font-semibold capitalize">
                    {listing.name}
                  </span>
                </p>
                <textarea
                  name="message"
                  id="message"
                  rows={2}
                  value={message}
                  onChange={handleOnChange}
                  placeholder="Enter your message here..."
                  className="w-full border p-3 rounded-lg"
                ></textarea>

                <Link
                  onClick={handleSendMessage}
                  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className="bg-ubOrange text-white text-center p-3 uppercase rounded-lg hover:bg-orange-500"
                >
                  Send Message
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
