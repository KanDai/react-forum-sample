import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useForum } from '../hooks/forum'

export const Root = () => {
    const { posts, isLoading, getPosts } = useForum()

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            <h1>Root</h1>

            {isLoading ? (
                <div>loading...</div>
            ) : (
                <>
                    {posts.length > 0 ? (
                        <ul
                            style={{
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            {posts.map((post) => (
                                <li
                                    key={post.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    <div>
                                        <div>名前：{post.name}</div>
                                        <div>{post.content}</div>
                                    </div>
                                    <div>
                                        <Link to={`/post/${post.id}/edit`}>
                                            Edit
                                        </Link>
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
                </>
            )}
        </div>
    )
}
