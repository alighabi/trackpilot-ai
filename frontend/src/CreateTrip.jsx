import { useState } from 'react'
import { API_URL } from './api'

function CreateTrip({ onCreated }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [createdCode, setCreatedCode] = useState('')
  const [error, setError] = useState('')

  async function createTrip() {
    const response = await fetch(API_URL + '/api/trips/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
    })

    const data = await response.json()
    if (response.ok) {
      setCreatedCode(data.code)
      setOrigin('')
      setDestination('')
      setError('')
      onCreated()
    } else {
      setError('Could not create trip')
    }
  }

  return (
    <div className="card">
      <h2>New trip</h2>
      <input
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
      />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
      />
      <button onClick={createTrip}>Create</button>
      {createdCode && <p>Trip code: {createdCode}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default CreateTrip
