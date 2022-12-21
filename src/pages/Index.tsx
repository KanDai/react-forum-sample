import { Link } from 'react-router-dom'

export const Root = () => {
    return (
        <div>
            <h1>Root</h1>
            <Link to="/post/new">New</Link>
            <Link to="/post/1/edit">Edit</Link>
        </div>
    )
}
