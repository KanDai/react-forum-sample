import { atom, useAtom } from 'jotai'
import type { Post, GetPostResponse, AddPostRequest } from '../types/forum'
import { apiClient } from '../lib/apiClient'
import { useState } from 'react'

const postsState = atom<GetPostResponse[]>([])
const listUpdateState = atom(true)

export const useForum = () => {
    const [posts, setPosts] = useAtom(postsState)
    const [isLoading, setIsLoading] = useState(false)
    const [isListUpdate, setIsListUpdate] = useAtom(listUpdateState)

    const getPosts = async () => {
        if (!isListUpdate) return
        try {
            setIsLoading(true)
            const posts = await apiClient.get<GetPostResponse[]>('/forum')
            setPosts(posts.data)
            setIsListUpdate(false)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const getPost = async (id: number) => {
        if (posts.length) {
            const post = posts.find((p) => p.id === id)
            if (post) return post
        }

        try {
            setIsLoading(true)
            const post = await apiClient.get<GetPostResponse>(`/forum/${id}`)
            if (post.data) return post.data
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const addPost = async (post: AddPostRequest) => {
        try {
            setIsLoading(true)
            await apiClient.post('/forum', post)
            setIsListUpdate(true)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const editPost = async (post: Post) => {
        try {
            setIsLoading(true)
            const { name, content, password } = post
            await apiClient.put(`/forum/${post.id}`, {
                name,
                content,
                password,
            })
            setIsListUpdate(true)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const deletePost = async (id: number, password: string) => {
        try {
            setIsLoading(true)
            await apiClient.delete(`/forum/${id}`, {
                data: { password },
            })
            setIsListUpdate(true)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {
        posts,
        isLoading,
        getPosts,
        getPost,
        addPost,
        editPost,
        deletePost,
    }
}
