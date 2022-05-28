import { Link } from 'react-router-dom'
import './Landing.css'
import { Button } from './Button'

export const Landing = () => {
  return (
        <div className="landing">
            <Link to="/new"><Button text={'New Session'} /></Link>
            <Link to="/join"><Button text={'Join Session'} /></Link>
        </div>
  )
}
