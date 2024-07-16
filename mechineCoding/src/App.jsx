import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/routes'

import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<h1>loading</h1>}>
          <Routes>
            {routes?.map((route, idx) => {
              return <Route
                key={idx}
                path={route.path}
                element={<route.component />}
              />
            })}
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
