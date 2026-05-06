import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function randomUser() {
    setLoading(true)

    try {
      const response = await fetch(
        'https://api.freeapi.app/api/v1/public/randomusers/user/random'
      )

      const result = await response.json()

      setData(result.data)
    } catch (error) {
      console.log(error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    randomUser()
  }, [])

  // Loading Screen
  if (loading || !data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-500 animate-spin fill-orange-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    )
  }

  return (
    <main className="bg-black min-h-screen text-white px-4 xl:px-40 ">
      
      {/* Header */}
      <header className="h-16 bg-gray-800 rounded-lg flex items-center justify-between px-4 mb-10">
        
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded-full"
            src={data.picture.medium}
            alt="user"
          />

          <h1 className="text-xl font-light text-gray-300">
            Random User Page
          </h1>
        </div>

        <button
          className="text-sm bg-orange-400 px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300 disabled:bg-red-400"
          onClick={randomUser}
          disabled={loading}
        >
          Change User
        </button>
      </header>

      {/* User Card */}
      <section className="flex justify-center items-center">
        
        <div className="bg-[#028386] max-w-sm w-full p-6 rounded-xl shadow-lg border border-gray-700">
          
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full mb-5"
              src={data.picture.large}
              alt="profile"
            />

            <h2 className="text-2xl font-semibold text-center">
              {data.name.title}. {data.name.first} {data.name.last}
            </h2>

            <p className="text-sm text-gray-300 mt-2">
              {data.gender} • {data.dob.age} years old
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span> {data.email}
            </p>

            <p>
              <span className="font-semibold">Phone:</span> {data.phone}
            </p>
          </div>

          {/* Address */}
          <div className="mt-6 bg-blue-900 p-4 rounded-lg text-sm">
            
            <h3 className="font-semibold mb-2 text-base">Address</h3>

            <ul className="space-y-1">
              <li>
                Street: {data.location.street.number}{' '}
                {data.location.street.name}
              </li>

              <li>City: {data.location.city}</li>

              <li>Postcode: {data.location.postcode}</li>

              <li>
                {data.location.state}, {data.location.country}
              </li>

              <li>
                Timezone: {data.location.timezone.description}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App