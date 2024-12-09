import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-mainColor">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 py-20 px-10 xl:px-0">
        <div className="flex flex-col items-center gap-0.5 xl:items-start">
          <Link to="/">
            <h1 className="font-bold text-xl flex flex-wrap space-x-0.5 text-center">
              <span className="text-[#fb923c]">Urban</span>
              <span className="text-[#191919]">Property</span>
            </h1>
          </Link>
          <p>59 Bervely Hill Ave. Brooklyn Town,</p>
          <p> New York, NY 5630, CA, US</p>
          <p>+(123) 456-7890</p>
          <p>urbanproperty@gmail.com</p>
        </div>

        <div className="flex flex-col items-center gap-0.5 xl:items-start">
          <h3 className="font-semibold">Features</h3>
          <Link to="#">Home</Link>
          <Link to="#">Apartments</Link>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
        </div>

        <div className="flex flex-col items-center gap-0.5 xl:items-start">
          <h3 className="font-semibold">Information</h3>
          <Link to="#">Listings v1</Link>
          <Link to="#">Listings v2</Link>
          <Link to="#">Property Details</Link>
          <Link to="#">Profile</Link>
        </div>

        <div className="flex flex-col items-center gap-0.5 xl:items-start">
          <h3 className="font-semibold">Documentation</h3>
          <Link to="#">Blog</Link>
          <Link to="#">FAQ</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">License</Link>
        </div>
      </div>
    </footer>
  )
}
