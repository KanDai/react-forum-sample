import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForum } from '../hooks/forum'

export const PostNew = () => {
    const navigate = useNavigate()
    const { addPost } = useForum()

    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [password, setPassword] = useState('')

    const handleInputName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handleInputContent = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        setContent(e.currentTarget.value)
    }

    const handleInputPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await addPost({ name, content, password })
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Post</h1>
            <div>
                <div>
                    <span>名前</span>
                    <input type="text" onInput={handleInputName} />
                </div>
                <div>
                    <span>内容</span>
                    <textarea onInput={handleInputContent}></textarea>
                </div>
                <div>
                    <span>パスワード</span>
                    <input type="password" onInput={handleInputPassword} />
                </div>
                <div>
                    <button type="button" onClick={handleSubmit}>
                        投稿
                    </button>
                    <div>
                        <Link to="/">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
