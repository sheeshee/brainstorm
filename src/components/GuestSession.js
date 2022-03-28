import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export const GuestApp = ({ name, connection, setResults }) => {
    const [ prompt, setPrompt ] = useState("")
    const [ mode, setMode ] = useState("wait")
    const [ submission, setSubmission ] = useState({})

    useEffect(() => connection.on('data', (data) => {
        console.log(data)
        setMode(data.mode)
        if(data.prompt){
            setPrompt(data.prompt)
        }
        if(data.submission){
            setSubmission(data.submission)
        }
        if(data.results){
            setResults(data.results)
        }
    }), [connection, setResults])

    var applet;
    switch(mode){
        case "review":
            applet = <Voter submission={submission} connection={connection}/>
            break
        case "submit":
            applet = <Submitter name={name} connection={connection}/>
            break
        case "results":
            applet = <Navigate to="../results" />
            break
        default:
            applet = <p>Please wait for the session to start</p>
    }

    return (
        <div>
            <h2>{name}</h2>
            <h1>{prompt}</h1>
            { applet }
        </div>
    )
}


const Voter = ({ submission, connection }) => {
    const [ hasVoted, setHasVoted ] = useState(false)

    useEffect(() => setHasVoted(false), [submission.id])

    const sendVote = (vote) => {
        setHasVoted(true)
        connection.send({
            type: "vote",
            vote: vote,
            submission: submission
        })
    }

    const handleLike = () => sendVote(1)
    const handleDislike = () => sendVote(0)

    return (
        <div>
            <p>{submission.text}</p>
            {hasVoted?
            <p>Submitted</p>
            :
            <div>
                <button onClick={handleLike}>I like it</button>
                <button onClick={handleDislike}>Pass</button>
            </div>
            }
        </div>
    )
}


const Submitter = ({ name, connection }) => {

    const [ text, setText ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        connection.send({
            type: "submission",
            submitted_by: name,
            text: text
        })
        setText("")
    }

    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
