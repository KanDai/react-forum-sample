import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { InputForm } from '../components/InputForm'
import { useForum } from '../hooks/forum'
import type { AddPostRequest, GetPostResponse } from '../types/forum'

export const PostEditor = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { getPost, editPost, deletePost } = useForum()
    const [currentPost, setCurrenPost] = useState<GetPostResponse | null>(null)

    const init = async () => {
        if (!id) {
            return
        }
        const res = await getPost(Number(id))
        if (!res) return
        setCurrenPost(res)
    }

    useEffect(() => {
        init()
    }, [])

    const handleSubmit = async (post: AddPostRequest) => {
        try {
            if (!id) {
                throw new Error('id is undefined')
            }
            const editablePost = {
                ...post,
                id: Number(id),
            }

            await editPost(editablePost)
            navigate('/')
        } catch (e) {
            alert(e)
        }
    }

    const handleDelete = async (password: string) => {
        try {
            if (!id) {
                throw new Error('id is undefined')
            }

            await deletePost(Number(id), password)
            navigate('/')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <h1>Edit</h1>
            {currentPost && (
                <InputForm
                    type="edit"
                    name={currentPost.name}
                    content={currentPost.content}
                    onSubmit={handleSubmit}
                    onDelete={handleDelete}
                />
            )}
            <div>
                <Link to="/">Back</Link>
            </div>
        </div>
    )
}
