import { Link } from 'react-router-dom'
import { useForum } from '../hooks/forum'

export const Root = () => {
    const { posts } = useForum()

    return (
        <div>
            <h1>Root</h1>

            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div>{post.name}</div>
                            <div>{post.content}</div>
                            <div>
                                <Link to={`/post/${post.id}/edit`}>Edit</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>投稿はありません</div>
            )}

            <div>
                <Link to="/post/new">New</Link>
            </div>
        </div>
    )
}
