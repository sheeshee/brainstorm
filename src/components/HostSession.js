import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom"


export const HostApp = ({ connectionList, prompt, setResults }) => {

  const [counter, setCounter] = useState(0)
  const [submissions, setSubmissions] = useState([]);
  const [votes, setVotes] = useState([]);
  const addSubmission = newSubmission => setSubmissions(state => [...state, newSubmission])
  const addVote = newVote => setVotes(state => [...state, newVote])
  const counterRef = useRef(counter)

  useEffect(() => counterRef.current = counter)

  useEffect(() => {
    connectionList.forEach(conn => {
      conn.on('data', data => {
        if (data.type === "submission") {
          console.log('submission received', data)
          addSubmission({ ...data, id: (counterRef.current) })
          setCounter(state => state + 1)
        } else if (data.type === "vote") {
          console.log("vote received", data)
          addVote(data)
        }
      })
    });
  }, [connectionList])


  return (
    <Routes>
      <Route path="review" element={<Review votes={votes} connectionList={connectionList} setResults={setResults} />} />
      <Route path="" element={<SubmissionViewer submissions={submissions} prompt={prompt} />} />
    </Routes>
  )
}


const SubmissionViewer = ({ submissions, prompt }) => {

  const { state } = useLocation();

  return (
    <div>
      <h1>{prompt}</h1>
      <ul>
        {submissions.map((submission, i) => <li key={i}>{submission.text}</li>)}
      </ul>
      <Link to="review" state={{ ...state, submissions: submissions, prompt: prompt }}>Start Review</Link>
    </div>
  )
}


const Review = ({ connectionList, votes, setResults }) => {
  const { state } = useLocation();
  const { prompt, submissions } = state
  const [ progress, setProgress ] = useState(0);
  return (
    <div>
      <h1>Review: {prompt}</h1>
      <Spotlight votes={votes} connectionList={connectionList} submissions={submissions} progress={progress} setProgress={setProgress} setResults={setResults} />
    </div>

  )
}


const Spotlight = ({ connectionList, votes, submissions, progress, setProgress, setResults }) => {
  const onFinal = progress === (submissions.length - 1)

  const tallyVotes = votes => {
    const results = []
    for (let index in submissions) {
      let submission = submissions[index]
      let score = votes.filter(vote => vote.submission.id === submission.id)
        .map(vote => vote.vote)
        .reduce((partialSum, a) => partialSum + a, 0);
      results.push({ ...submission, score: score })
    }
    return results
  }

  const emitResults = (votes) => {
    const results = tallyVotes(votes)
    connectionList.forEach(conn => {
      conn.send({ mode: "results", results: results })
    })
    setResults(results)
  }

  return (
    <div>
      <Candidate submission={submissions[progress]} connectionList={connectionList} />
      {onFinal ?
        <p>This is the last one.</p>
        : <p>Up Next: {submissions[progress + 1].text}</p>}
      <p>{submissions[progress].submitted_by}, please tell us a bit more.</p>
      <VoteCounter votes={votes} expected_votes={connectionList.length} submission={submissions[progress]} />
      {onFinal ?
        <Link to="../results" onClick={() => emitResults(votes)}>Finish</Link>
        : <button onClick={() => { setProgress(progress + 1) }}>Next</button>}
    </div>
  )
}


const Candidate = ({ submission, connectionList }) => {

  useEffect(() => {
    connectionList.forEach((conn) => {
      conn.send({ mode: "review", submission: submission })
    })
  }, [connectionList, submission])

  return (
    <h3>{submission.text}</h3>
  )
}


const VoteCounter = ({ votes, submission, expected_votes }) => {
  const count_votes = (votes, submission) => votes.filter(
    vote => vote.submission.id === submission.id
  ).length
  return (
    <div>
      <p>{count_votes(votes, submission)}/{expected_votes} guests have responded.</p>
    </div>
  )
}
