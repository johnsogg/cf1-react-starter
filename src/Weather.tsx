import { useEffect, useState } from 'react'
import './Weather.css'

// Demo of fetching data from a remote API (Open-Meteo: free, no API key).
// Docs: https://open-meteo.com/en/docs

type CityLocation = {
  name: string;
  latitude: number;
  longitude: number;
}

// A canned list of cities and where they are. Our dropdown shows their names
// but uses their geo locations in the API call.
const cityData: Array<CityLocation> = [
  { name: 'Boston', latitude: 42.36, longitude: -71.06 },
  { name: 'London', latitude: 51.51, longitude: -0.13 },
  { name: 'Tokyo', latitude: 35.68, longitude: 139.69 },
  { name: 'Sydney', latitude: -33.87, longitude: 151.21 },
  { name: 'Boulder', latitude: 40.016869, longitude: -105.279617 },
]

type Current = {
  temperature_2m: number
  wind_speed_10m: number
}

type ForecastResponse = {
  current: Current
  current_units: { temperature_2m: string; wind_speed_10m: string }
}

export const Weather = () => {
  const [cityName, setCityName] = useState(cityData[0].name) // first one
  const [data, setData] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const city = cityData.find((c) => c.name === cityName)!
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      `?latitude=${city.latitude}&longitude=${city.longitude}` +
      '&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph'

    // Lets us cancel the request if the user picks another city mid-flight
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setData(await response.json())
        setLoading(false)
      } catch (err) {
        if (controller.signal.aborted) return // ignore our own cancellation
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setLoading(false)
      }
    }
    load()

    return () => controller.abort()
  }, [cityName])

  return (
    <section className="weather">
      <h2>Weather</h2>
      <label>
        City{' '}
        <select value={cityName} onChange={(e) => setCityName(e.target.value)}>
          {/* This next bit is a plain JavaScript Array map call - it converts
              each city to an <option> HTML item, which is just one entry in
              the dropdown list. */}
          {cityData.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      {/* The aria-related attributes are for accessibility */}
      <div className="weather-result" aria-live="polite">
        {loading && <p>Loading…</p>}
        {error && <p className="weather-error">Error: {error}</p>}
        {!loading && !error && data && (
          <p>
            <strong>
              {data.current.temperature_2m}
              {data.current_units.temperature_2m}
            </strong>
            , wind {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}
          </p>
        )}
      </div>
    </section>
  )
}
