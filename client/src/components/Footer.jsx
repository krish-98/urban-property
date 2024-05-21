import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#fff7f2]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center py-20 gap-10 px-10">
        <div className="space-y-1 w-[300px] h-[200px]">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap space-x-0.5 text-center">
              <span className="text-[#fb923c]">Urban</span>
              <span className="text-[#191919]">Property</span>
            </h1>
          </Link>
          <p>59 Bervely Hill Ave. Brooklyn Town,</p>
          <p> New York, NY 5630, CA, US</p>
          <p>+(123) 456-7890</p>
          <p>urbanproperty@gmail.com</p>
        </div>

        <div className="space-y-1 w-[300px] h-[200px]">
          <h3 className="font-semibold">Features</h3>
          <p>Home</p>
          <p>Apartments</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div className="space-y-1 w-[300px] h-[200px]">
          <h3 className="font-semibold">Information</h3>
          <p>Listings v1</p>
          <p>Listings v2</p>
          <p>Property Details</p>
          <p>Profile</p>
        </div>

        <div className="space-y-1 w-[300px] h-[200px]">
          <h3 className="font-semibold">Documentation</h3>
          <p>Blog</p>
          <p>FAQ</p>
          <p>Privacy Policy</p>
          <p>License</p>
        </div>
      </div>
    </footer>
  )
}
