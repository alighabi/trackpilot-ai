import { useState } from 'react'

function App() {
  const [code, setCode] = useState('')
  const [trip, setTrip] = useState(null) // new
  const [error, setError] = useState('')

   async function findTrip() {
    const response = await fetch('http://127.0.0.1:8000/api/driver/' + code + '/')
    if (response.ok) {
      setTrip(await response.json())
      setError('')
    } else {
      setTrip(null)
      setError('Trip not found')
    }
  }
  
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
                         {trip.status === 'assigned' && (
            <button onClick={() => sendAction('start')}>start</button>
          )}
          {trip.status === 'started' && (
            <button onClick={() => sendAction('arrive')}>arrive</button>
          )}
          {trip.status === 'arrived' && (
            <button onClick={() => sendAction('finish')}>finish</button>
          )}
                    {trip.started_at && (
            <p>Started: {new Date(trip.started_at).toLocaleString('it-IT')}</p>
          )}
          {trip.arrived_at && (
            <p>Arrived: {new Date(trip.arrived_at).toLocaleString('it-IT')}</p>
          )}
          {trip.finished_at && (
            <p>Finished: {new Date(trip.finished_at).toLocaleString('it-IT')}</p>
          )}
                    {trip.duration && (
            <p>Duration: {trip.duration.split('.')[0]}</p>
          )}
                    
       </div>
      )}
              {error && <p>{error}</p>}
    </div>
  )
}

export default App