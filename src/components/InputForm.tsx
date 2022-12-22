import React, { useState } from 'react'
import type { AddPostRequest } from '../types/forum'

type InputFormProps = {
    type: 'new' | 'edit'
    name?: string
    content?: string
    onSubmit: (post: AddPostRequest) => void
    onDelete?: (password: string) => void
}

export const InputForm = ({
    type,
    onSubmit,
    onDelete,
    ...rest
}: InputFormProps) => {
    const [name, setName] = useState(rest.name || '')
    const [content, setContent] = useState(rest.content || '')
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

    const handleDelete = () => {
        if (onDelete) onDelete(password)
    }

    return (
        <div>
            <div>
                <span>名前</span>
                <input
                    type="text"
                    defaultValue={name}
                    onInput={handleInputName}
                />
            </div>
            <div>
                <span>内容</span>
                <textarea
                    onInput={handleInputContent}
                    defaultValue={content}
                ></textarea>
            </div>
            <div>
                <span>パスワード</span>
                <input type="password" onInput={handleInputPassword} />
            </div>
            <div>
                <button type="button" onClick={handleSubmit}>
                    {type === 'new' ? '投稿' : '編集'}
                </button>
                {type === 'edit' && (
                    <button type="button" onClick={handleDelete}>
                        削除
                    </button>
                )}
            </div>
        </div>
    )
}
