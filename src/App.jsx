import DormCard from './DormCard'
import dorms from './data/dorms'
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Rate My Dorm 🏠</h1>
      {dorms.map(dorm => (
        <DormCard
          key={dorm.id}
          name={dorm.name}
          location={dorm.location}
          rating={dorm.rating}
        />
      ))}
    </div>
  )
}

export default App