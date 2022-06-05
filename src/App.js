import {
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'

import { Landing } from './components/Landing'
import { CreateSession } from './components/CreateSession'
import { ActiveSession } from './components/ActiveSession'
import { JoinSession } from './components/JoinSession'
import { HelpPage } from './components/HelpPage'
import { FeedbackPage } from './components/FeedbackPage'
import { useState } from 'react'
import './App.css'

function App () {
  const [connection, setConnection] = useState(undefined)
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [connectionList, setConnectionList] = useState([])

  return (
    <div className="App">
      <header>
        <Link to="/">Brainstorm</Link>
        <div>
          <Link to="feedback" className="link feedback">Give Feedback</Link>
          <Link to="help" className="link help">Help</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="join/*" element={<JoinSession setName={setName} setConnection={setConnection} setRole={setRole} />} />
          <Route path="new" element={<CreateSession setRole={setRole} connectionList={connectionList} setConnectionList={setConnectionList} />} />
          <Route path="session/:session/*" element={<ActiveSession name={name} connection={connection} role={role} connectionList={connectionList} />} />
          <Route path="session" element={<Navigate to="/" />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="" element={<Landing />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <footer>
        <div>
          <p>
            A web app by <a href="https://sheeshee.github.io">Sam Sheehy</a>. Find this project on <a href="https://github.com/sheeshee/brainstorm">GitHub</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
