import Planets from './planets'

const getData = async (url = 'https://swapi.dev/api/planets/') => {
  const res = await fetch(url)

  const { results, next } = await res.json()

  if (next) {
    const nextData = await getData(next)

    results.push(...nextData)
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return results
}

export default async function Home() {
  const results = await getData()

  return (
    <main className="flex min-h-screen flex-wrap items-center justify-center p-6 md:p-24">
      <nav className='w-full text-center mb-10'>
        <h1>Welcome to the Star Wars Planet API Center</h1>
      </nav>

      <Planets results={results} />
    </main>
  )
}
