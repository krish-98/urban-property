import { Link } from 'react-router-dom'
import underConstruction from '../assets/under_construction.jpg'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-72px)] bg-gradient-to-r from-[#916945] to-[#ffca79]">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center pt-40 drop-shadow-2xl px-8">
        <img
          className="w-[300px] lg:w-[700px] rounded-br-full"
          src={underConstruction}
          alt="Under Construction"
        />
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <p className="text-white text-4xl lg:text-8xl text-center">404</p>
          <p className="text-lg">
            We couldn&apos;t find what you were looking for
          </p>

          <Link
            to={'/'}
            className="text-base bg-white w-fit self-center text-[#fb923c] p-4 px-6 rounded-xl hover:bg-[#fb923c] hover:text-white transition duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
