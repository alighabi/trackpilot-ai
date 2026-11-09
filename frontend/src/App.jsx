import { useState } from 'react'

function App() {
  const [code, setCode] = useState('')
  const [trip, setTrip] = useState(null) // new

  function findTrip() { // new
    fetch('http://127.0.0.1:8000/api/driver/' + code + '/') // new
      .then((response) => response.json()) // new
      .then((data) => setTrip(data)) // new
  } // new

  return (
    <div>
      <h1>Track Pilot AI</h1>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter trip code"
      />
      <button onClick={findTrip}>Find trip</button> {/* new */}
            {trip && (
        <div>
          <h2>{trip.origin} → {trip.destination}</h2>
          <p>Status: {trip.status}</p>
        </div>
      )}
    </div>
  )
}

export default App