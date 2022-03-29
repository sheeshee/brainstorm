import { Link, Routes, Route, useParams } from "react-router-dom"
import { useState } from "react";
import { HostApp } from "./HostSession"
import { GuestApp } from "./GuestSession";

export const ActiveSession = ({ name, connection, connectionList, role }) => {
  const { session } = useParams();
  const [results, setResults] = useState([])

  if (role !== "guest" && role !== "host") {
    console.error(`Unknown role: ${role}`)
    return <div>Unknown Role Error</div>
  }

  return (
    <div>
      <h2>Session {session}</h2>
      <Routes>
        <Route path="results" element={<Results results={results} />} />
        <Route path="*" element={role === "host" ?
          <HostApp connectionList={connectionList} connection={connection} setResults={setResults} />
          : <GuestApp name={name} connection={connection} setResults={setResults} />}
        />
      </Routes>
    </div>
  )
}


const Results = ({ results }) => {
  return (
    <div>
      <h1>Results</h1>
      <ul>
        {results.sort((a, b) => b.score - a.score).map((submission, i) => <li key={i}>{submission.text}:{submission.score}</li>)}
      </ul>
      <Link to="/">Exit to Home</Link>
    </div>
  )
}
