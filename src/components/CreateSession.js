import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makePeer } from '../utils'
import { Button } from './Button'
import './CreateSession.css'

export const CreateSession = ({ setRole, setConnectionList, connectionList }) => {
  const [sessionCode, setCode] = useState(undefined)
  const [prompt, setPrompt] = useState('')
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
    <div className='create-session'>
      <h1>New Session</h1>
      <ShareCodeHelper sessionCode={sessionCode}/>
      <JoinedGuests connections={connectionList} />
      <PromptInput setPrompt={setPrompt} />
      <StartButton connectionList={connectionList} prompt={prompt} sessionId={sessionCode} setRole={setRole} />
    </div>
  )
}

const JoinedGuests = ({ connections }) => {
  return (
    <div className="guest-list">
      <h2>Joined Guests</h2>
      {connections.length > 0
        ? <ul>
        {connections.map((conn, i) => <li key={i}>{conn.metadata.name}</li>)}
      </ul>
        : <p>No one here yet...</p>
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
    setRole('host')
    connectionList.forEach((conn) => {
      conn.send({
        mode: 'submit',
        prompt
      })
    })
  }

  return (
    <div className="start-button">
      {prompt
        ? <Link to={`/session/${sessionId}`}
          state={{
            prompt,
            role: 'host'
          }}
        >
        <Button text={'Start Session'} onClick={handleClick}/>
        </Link>
        : <Button text={'Start Session'} onClick={
          () => alert('You need to enter a prompt first')
        } />
      }
    </div>
  )
}

const ShareCodeHelper = ({ sessionCode }) => {
  const link = `${process.env.PUBLIC_URL}#/join/${sessionCode}`

  return (
    <div>{
      sessionCode === undefined
        ? <p>Getting session code...</p>
        : <>
          <p>
            Have your guest go to {process.env.PUBLIC_URL}, click &quot;Join Session&quot;,
            then enter the code below:
          </p>
          <div>{sessionCode}</div>
          <p>
            or share this link: <a href={link}>{link}</a>
          </p>
        </>
      }
    </div>
  )
}
