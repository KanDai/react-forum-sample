import React, { useState } from 'react'
import type { AddPostRequest } from '../types/forum'

type InputFormProps = {
    type: 'new' | 'edit'
    onSubmit: (post: AddPostRequest) => void
}

export const InputForm = ({ type, onSubmit }: InputFormProps) => {
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

    const handleSubmit = () => {
        onSubmit({ name, content, password })
    }

    return (
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
            </div>
        </div>
    )
}
