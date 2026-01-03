import { IconSearch } from '@tabler/icons-react'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 max-xl:px-4">
      <a href="">
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tighter">
          Urban Property
        </h1>
      </a>

      <ul className="hidden lg:flex gap-12 items-center">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About us</li>
        <li className="cursor-pointer">Contact</li>

        <IconSearch className="cursor-pointer" />
      </ul>

      <button className="text-sm lg:text-base cursor-pointer border border-slate-200/90 px-2 py-0.75 md:px-3 md:py-1.25 lg:px-4 lg:py-2 rounded-full">
        Sign In
      </button>
    </nav>
  )
}
