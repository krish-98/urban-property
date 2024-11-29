import { HashLoader } from 'react-spinners'

export default function SuspenseLoader() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-mainColor">
      <HashLoader color="#fb923c" />
    </div>
  )
}
