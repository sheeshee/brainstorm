import { Link } from "react-router-dom"


export const Landing = () => {
    return (
        <div>
            <Link to="/new">New Session</Link>
            <Link to="/join">Join Session</Link>
        </div>
    )
}
