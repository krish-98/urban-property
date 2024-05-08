import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing?.userRef}`)
        const data = await res.json()
        setLandlord(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchLandlord()
  }, [listing?.userRef])

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <>
      {landlord && (
        <div className="px-3 py-5 md:py-7 md:px-6 border rounded-md shadow-sm space-y-4">
          <h4 className="text-xl font-semibold">Owner Information</h4>

          <div className="flex items-center gap-2 md:gap-4">
            <img
              src={landlord?.avatar}
              alt={landlord?.username}
              referrerPolicy="no-referrer"
              className="rounded-lg"
            />

            <div className="flex flex-col gap-2">
              <h6 className="capitalize text-sm tracking-wide font-semibold md:text-base">
                {landlord?.username}
              </h6>
              <p className="text-sm text-gray-500 md:text-base">
                {landlord?.email}
              </p>
              <Link
                to={`mailto:${landlord?.email}?subject=Regarding this property&body=I'm contacting you regarding ${listing?.name} property information`}
                className="bg-[#fb923c] tracking-wider text-white text-center font-semibold uppercase px-4 py-2 rounded-xl hover:scale-105 hover:opacity-90 transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        // <div className="flex flex-col gap-2">
        //   <p>
        //     Contact <span>{landlord.username}</span> for{' '}
        //     <span>{listing.name.toLowerCase()}</span>
        //   </p>
        //   <textarea
        //     name="message"
        //     id="message"
        //     rows="2"
        //     value={message}
        //     onChange={handleOnChange}
        //     placeholder="Enter your message here..."
        //     className="w-full border p-3 rounded-lg"
        //   ></textarea>

        //   <Link
        //     to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
        //     className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
        //   >
        //     Send Message
        //   </Link>
        // </div>
      )}
    </>
  )
}
