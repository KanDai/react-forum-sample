import { Link, useNavigate } from 'react-router-dom'
import { InputForm } from '../components/InputForm'
import { useForum } from '../hooks/forum'
import type { AddPostRequest } from '../types/forum'

export const PostNew = () => {
    const navigate = useNavigate()
    const { addPost } = useForum()

    const handleSubmit = async (poet: AddPostRequest) => {
        try {
            await addPost(poet)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Post</h1>
            <InputForm type="new" onSubmit={handleSubmit} />
            <div>
                <Link to="/">Back</Link>
            </div>
        </div>
    )
}
