function TripList({ trips }) {
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