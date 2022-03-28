import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makePeer } from "../utils";



export const CreateSession = ({ setRole, setConnectionList, connectionList }) => {
    const [session_code, setCode] = useState(undefined)
    const [prompt, setPrompt] = useState("")
    const [peer, setPeer] = useState(undefined)

    const startSession = (setCode) => {
        const peer = makePeer()
        peer.on('open', (id) => {setCode(id)})
        setPeer(peer)
        setConnectionList([])
    }


    useEffect(() => {
        const addConnection = (newConnection) => setConnectionList(state => [...state, newConnection])
        if(peer){
            peer.on('connection', (dataConnection) => {
                console.log('peer connected', dataConnection)
                addConnection(dataConnection)

            })
        }
    }, [peer, setConnectionList])


    // open up a listening channel
    useEffect(() => startSession(setCode), [])

    const link = `http://localhost:3000/join/${session_code}`

    return(
        <div>
            <h1>New Session</h1>
            <p>
                Have your guest go to brainstorm.js.org, click "Join Session",
                then enter the code below:
            </p>
            <div>{session_code}</div>
            <p>
                or share this link: <a href={link}>{link}</a>
            </p>
            <JoinedGuests connections={connectionList} />
            <PromptInput setPrompt={setPrompt} />
            <StartButton connectionList={connectionList} prompt={prompt} sessionId={session_code} setRole={setRole}/>
        </div>
    )
}


const JoinedGuests = ({ connections }) => {
    return(
        <div>
            <h2>Joined Guests</h2>
            <ul>
                {connections.map((conn, i) => <li key={i}>{conn.metadata.name}</li>)}
            </ul>
        </div>
    )
}

const PromptInput = ({ setPrompt }) => {
    return(
        <div>
            <h2>Enter Prompt</h2>
            <p>What do you want everyone to think about?</p>
            <input type="text" onChange={(e) => {setPrompt(e.target.value)}}/>
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

    return(
        <div>
            {prompt?
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
