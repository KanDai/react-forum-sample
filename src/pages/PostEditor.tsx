import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { InputForm } from '../components/InputForm'
import { useForum } from '../hooks/forum'
import type { AddPostRequest, GetPostResponse } from '../types/forum'

export const PostEditor = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { isLoading, getPost, editPost, deletePost } = useForum()
    const [currentPost, setCurrenPost] = useState<GetPostResponse | null>(null)
    const [is404, setIs404] = useState(false)

    const init = async () => {
        try {
            if (!id) {
                return
            }
            const res = await getPost(Number(id))
            if (!res) return
            setCurrenPost(res)
        } catch (e) {
            setIs404(true)
        }
    }

    useEffect(() => {
        init()
    }, [])

    const handleSubmit = async (post: AddPostRequest) => {
        try {
            const editablePost = {
                ...post,
                id: Number(id),
            }
            await editPost(editablePost)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    const handleDelete = async (password: string) => {
        try {
            await deletePost(Number(id), password)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Edit</h1>

            {isLoading ? (
                <div>loading...</div>
            ) : is404 ? (
                <div>404 Not Found</div>
            ) : (
                <>
                    {currentPost && (
                        <InputForm
                            type="edit"
                            name={currentPost.name}
                            content={currentPost.content}
                            onSubmit={handleSubmit}
                            onDelete={handleDelete}
                        />
                    )}
                </>
            )}
            <div>
                <Link to="/">Back</Link>
            </div>
        </div>
    )
}
