export const getCookie = () => {
  const cookies = document.cookie.split('; ')
  let token

  for (let cookie of cookies) {
    if (cookie.includes('token')) {
      const value = cookie.split('=')[1]
      token = value
    }
  }

  return token
}
