import { useState } from 'react'

function App() {
  const [code, setCode] = useState('')
  const [trip, setTrip] = useState(null) // new
  const [error, setError] = useState('')

  function findTrip() { // new
    fetch('http://127.0.0.1:8000/api/driver/' + code + '/') // new
      .then((response) => response.json()) // new
      .then((data) => setTrip(data)) // new
  } // new
  
    async function sendAction(action) {
    const response = await fetch(
      'http://127.0.0.1:8000/api/driver/' + code + '/' + action + '/',
      { method: 'POST' }
    )
    const data = await response.json()
    if (response.ok) {
      setTrip(data)
      setError('')
    } else {
      setError(data.error)
    }
  }
    
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
               <button onClick={() => sendAction('start')}>start</button>
               <button onClick={() => sendAction('arrive')}>arrive</button>
               <button onClick={() => sendAction('finish')}>finish</button>
                    {error && <p>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default App