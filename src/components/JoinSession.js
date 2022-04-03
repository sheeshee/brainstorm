import { useEffect, useState } from "react"
import { useParams, Routes, Route, Navigate } from "react-router-dom"
import { makePeer } from "../utils"
import "./JoinSession.css"


export const JoinSession = ({ setName, setConnection, setRole }) => {
  const element = <JoinForm setName={setName} setConnection={setConnection} setRole={setRole} />
  return (
    <Routes>
      <Route path=":session_id_string" element={element} />
      <Route path="" element={element} />
    </Routes>
  )
}


const JoinForm = ({ setName, setConnection, setRole }) => {
  const { session_id_string } = useParams();
  const [session, setSession] = useState(session_id_string ? session_id_string : "")
  const [enableNavigate, setEnableNavigate] = useState(false);
  const [localName, setLocalName] = useState("")
  const [peer, setPeer] = useState()

  useEffect(() => setPeer(makePeer()), [])

  const connect = (session, name) => {
    const connection = peer.connect(session, { metadata: { name: name } })
    connection.on('open', () => { setEnableNavigate(true) })
    setConnection(connection)
    setRole("guest")
    setName(localName)
  }

  return (
    <div className="join-form">
      <h1>Join Session</h1>
      <p>Session Code</p>
      <input type="text" value={session} onChange={(e) => setSession(e.target.value)} />
      <p>Name</p>
      <input type="text" onChange={(e) => setLocalName(e.target.value)} />
      <div className="my-button" onClick={() => connect(session, localName)}>Join</div>
      {enableNavigate && <Navigate to={`/session/${session}`} />}
    </div>
  )

}
