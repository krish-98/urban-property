import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (data.success === false) {
        setIsLoading(false)
        setError(data.message)
        return
      }
      setIsLoading(false)
      setError(null)
      navigate("/")
      console.log(data)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto pt-36">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error ? (
        <p className="text-red-600 font-medium my-2 text-center">{error}</p>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          required
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          required
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an Account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
