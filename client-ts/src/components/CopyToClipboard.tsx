import { toast } from 'sonner'
import { FaShare } from 'react-icons/fa'

export default function CopyToClipboard() {
  return (
    <div className="sticky top-4 left-[85%] lg:left-[94%] border rounded-full w-11 h-11 lg:w-12 lg:h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:bg-ubOrange hover:border-none hover:scale-125 group transition-all duration-300">
      <FaShare
        className="group-hover:text-white"
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

//top-24 right-4 xl:right-[10%]
