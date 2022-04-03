import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makePeer } from "../utils";
import "./CreateSession.css"


export const CreateSession = ({ setRole, setConnectionList, connectionList }) => {
  const [session_code, setCode] = useState(undefined)
  const [prompt, setPrompt] = useState("")
  const [peer, setPeer] = useState(undefined)

  useEffect(() => {
    const addConnection = (newConnection) => setConnectionList(state => [...state, newConnection])
    if (peer) {
      peer.on('connection', (dataConnection) => {
        console.log('peer connected', dataConnection)
        addConnection(dataConnection)
      })
    }
  }, [peer, setConnectionList])

  // open up a listening channel
  useEffect(() => {
    const peer = makePeer()
    peer.on('open', (id) => { setCode(id) })
    setPeer(peer)
    setConnectionList([])
  }, [setConnectionList])

  return (
    <div>
      <h1>New Session</h1>
      <ShareCodeHelper session_code={session_code}/>
      <JoinedGuests connections={connectionList} />
      <PromptInput setPrompt={setPrompt} />
      <StartButton connectionList={connectionList} prompt={prompt} sessionId={session_code} setRole={setRole} />
    </div>
  )
}


const JoinedGuests = ({ connections }) => {
  return (
    <div className="guest-list">
      <h2>Joined Guests</h2>
      {connections.length > 0 ?
      <ul>
        {connections.map((conn, i) => <li key={i}>{conn.metadata.name}</li>)}
      </ul>
      :
      <p>No one here yet...</p>
      }
    </div>
  )
}


const PromptInput = ({ setPrompt }) => {
  return (
    <div>
      <h2>Enter Prompt</h2>
      <p>What do you want everyone to think about?</p>
      <input type="text" onChange={(e) => { setPrompt(e.target.value) }} />
    </div>
  )
}


const StartButton = ({ connectionList, prompt, sessionId, setRole }) => {

  const handleClick = () => {
    setRole("host")
    connectionList.forEach((conn) => {
      conn.send({
        mode: "submit",
        prompt: prompt
      })
    })
  }

  return (
    <div className="my-button start-button">
      {prompt ?
        <Link to={`/session/${sessionId}`}
          state={{
            prompt: prompt,
            role: "host"
          }}
          onClick={handleClick}
        >
          Start Session
        </Link>
        :
        <div onClick={
          () => alert("You need to enter a prompt first")
        }>
          Start Session
        </div>
      }
    </div>
  )
}


const ShareCodeHelper = ({ session_code }) => {

  const link = `${process.env.PUBLIC_URL}#/join/${session_code}`

  return (
    <div>
      <p>
        Have your guest go to {process.env.PUBLIC_URL}, click "Join Session",
        then enter the code below:
      </p>
      <div>{session_code}</div>
      <p>
        or share this link: <a href={link}>{link}</a>
      </p>
    </div>
  )
}
