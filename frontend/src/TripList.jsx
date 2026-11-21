import StatusBadge from './StatusBadge'
function TripList({ trips }) {
  return (
    <div className="card">
      <h2>All trips</h2>
      <ul>
        {trips.map((t) => (
          <li key={t.id}>
            {t.code}: {t.origin} → {t.destination}{' '}
            <StatusBadge status={t.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TripList
