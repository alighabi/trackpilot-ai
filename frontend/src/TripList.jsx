import { useState, useEffect } from 'react'

function TripList() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/trips/')
      .then((response) => response.json())
      .then((data) => setTrips(data))
  }, [])

  return (
    <div className="card">
      <h2>All trips</h2>
      <ul>
        {trips.map((t) => (
          <li key={t.id}>
            {t.code}: {t.origin} → {t.destination} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TripList