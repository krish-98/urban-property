import { FaShare } from 'react-icons/fa'
import { toast } from 'sonner'

export default function CopyToClipboard() {
  return (
    <div className="fixed top-24 right-4 xl:right-[10%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:bg-ubOrange hover:border-none hover:scale-125 group transition-all duration-300">
      <FaShare
        className="text-slate-500 group-hover:text-white"
        title="copy link"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)

          toast.success('Link copied to clipboard', {
            position: 'top-right',
          })
        }}
      />
    </div>
  )
}
