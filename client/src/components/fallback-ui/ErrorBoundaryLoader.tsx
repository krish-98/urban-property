export default function ErrorBoundaryLoader() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="fixed w-full h-full bg-mainColor text-[#fb923c] flex flex-col gap-4 items-center justify-center px-6">
      <h1 className="text-xl lg:text-3xl">Oops! Something went wrong!😐</h1>
      <p className="text-center ">
        Try refreshing the page or come back after sometime 🔃
      </p>
      <button onClick={handleReload} className="bg-black px-4 py-3 rounded-lg">
        Refresh the page
      </button>
    </div>
  )
}
