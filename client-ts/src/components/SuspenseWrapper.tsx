import { Suspense } from 'react'
import SuspenseLoader from './fallback-ui/SuspenseLoader'

export default function SuspenseWrapper({
  component,
}: {
  component: React.ReactNode
}) {
  return <Suspense fallback={<SuspenseLoader />}>{component}</Suspense>
}
