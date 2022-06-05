import { Link } from 'react-router-dom'
import { Button } from './Button'
import './HelpPage.css'

export const HelpPage = () => {
  return (
    <div className='help-page'>
      <h1>How it works</h1>
      <div>
        <p>
          This online app is a brainstorming aid. It helps a group get all
          their ideas about a particular topic out in the world and rank them
          in order of interest.
        </p>
        <p>
          It works like this:
        </p>
        <ol>
          <li> The host of the brainstorming activity creates a New Session. </li>

          <li>Guests join the session by either opening directly to the link the host shares or entering the code themselves.</li>

          <li>The host provides a prompt for the session and opens it up to ideas.</li>

          <li>The guests then have some time to submit idea responses to the prompt. These will show up on the hosts page. We designed the app so this page could be shared with all the guests (in person or via screen sharing)</li>

          <li>When the host is ready, they can move to the review phase of the session.</li>

          <li>During the review phase, each idea is shown one by one and the guest that submitted it has a chance to briefly expand on it. All guests then have a chance to vote on the idea.</li>

          <li>Once all ideas have been reviewed, the session ends and all participants see these ranked according to the feedback from the participants.</li>
        </ol>
      </div>
      <Link to="/"><Button text={'Back'} /></Link>
    </div>
  )
}
