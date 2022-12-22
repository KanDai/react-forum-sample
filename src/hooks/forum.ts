import { atom, useAtom } from 'jotai'
import type { Post, AddPostRequest } from '../types/forum'

const getStoragePosts = () => {
    const posts = localStorage.getItem('posts')
    return posts ? JSON.parse(posts) : []
}
const storagePosts: Post[] = getStoragePosts()

const postsState = atom<Post[]>(storagePosts)

export const useForum = () => {
    const [posts, setPosts] = useAtom(postsState)

    const getPost = async (id: number) => {
        const post = posts.find((p) => p.id === id)
        if (!post) {
            throw new Error('Post not found')
        }
        return {
            name: post.name,
            content: post.content,
        }
    }

    const addPost = async (post: AddPostRequest) => {
        const newPost = {
            ...post,
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        }
        setPosts((posts) => [...posts, newPost])
        localStorage.setItem('posts', JSON.stringify([...posts, newPost]))
    }

    const editPost = async (post: Post) => {
        const currentPostIndex = posts.findIndex((p) => p.id === post.id)

        if (currentPostIndex === -1) {
            throw 'Post not found'
        }
        if (post.password !== posts[currentPostIndex].password) {
            throw 'パスワードが一致しません'
        }

        posts[currentPostIndex].name = post.name
        posts[currentPostIndex].content = post.content
        setPosts((posts) => [...posts])
        localStorage.setItem('posts', JSON.stringify([...posts]))
    }

    const deletePost = async (id: number, password: string) => {
        const currentPostIndex = posts.findIndex((p) => p.id === id)

        if (currentPostIndex === -1) {
            throw 'Post not found'
        }
        if (password !== posts[currentPostIndex].password) {
            throw 'パスワードが一致しません'
        }

        posts.splice(currentPostIndex, 1)
        setPosts((posts) => [...posts])
        localStorage.setItem('posts', JSON.stringify([...posts]))
    }

    return {
        posts,
        getPost,
        addPost,
        editPost,
        deletePost,
    }
}
