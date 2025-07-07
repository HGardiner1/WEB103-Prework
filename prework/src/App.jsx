import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from "./Pages/ShowCreators"
import ViewCreator from "./Pages/ViewCreator"
import AddCreator from "./Pages/AddCreator"
import EditCreator from "./Pages/EditCreator"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/view" element={<ViewCreator />} />
        <Route path="/view" element={<AddCreator />} />
        <Route path="/view" element={<EditCreator />} />
      </Routes>
    </div>
        
  )
}

export default App
