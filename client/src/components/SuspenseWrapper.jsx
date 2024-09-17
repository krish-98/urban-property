import { Suspense } from 'react'
import Loader from './fallback-ui/Loader'

export default function SuspenseWrapper({ component }) {
  return <Suspense fallback={<Loader />}>{component}</Suspense>
}
