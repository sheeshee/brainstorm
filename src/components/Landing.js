import { Link } from "react-router-dom"
import "./Landing.css"


export const Landing = () => {
    return (
        <div className="landing">
            <Link className="my-button" to="/new">New Session</Link>
            <Link className="my-button" to="/join">Join Session</Link>
        </div>
    )
}
