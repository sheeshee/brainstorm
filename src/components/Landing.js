import { Link } from 'react-router-dom'
import './Landing.css'
import { Button } from './Button'

export const Landing = () => {
  return (
        <div className="landing">
          <h1>Brainstorm!</h1>
          <p>
            Read the <Link to="help">the help page</Link> for a quick primer,
            then click on one of the buttons below to get started!
          </p>
          <p>
            This web app is an experiment, so it is by no means perfect or bug-free.
            Whether you liked it or hated it, please consider <Link to="feedback">giving us some feedback</Link>.
          </p>
          <Link to="/new"><Button text={'New Session'}/></Link>
          <Link to="/join"><Button text={'Join Session'}/></Link>
        </div>
  )
}
