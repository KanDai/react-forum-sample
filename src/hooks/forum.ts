import { atom, useAtom } from 'jotai'

type Post = {
    id: number
    name: string
    content: string
    password: string
}

type AddPostRequest = Omit<Post, 'id'>

const getStoragePosts = () => {
    const posts = localStorage.getItem('posts')
    return posts ? JSON.parse(posts) : []
}
const storagePosts: Post[] = getStoragePosts()

const postsState = atom<Post[]>(storagePosts)

export const useForum = () => {
    const [posts, setPosts] = useAtom(postsState)

    const addPost = async (post: AddPostRequest) => {
        try {
            const newPost = {
                ...post,
                id: posts.length ? posts[posts.length - 1].id : 1,
            }
            setPosts((posts) => [...posts, newPost])
            localStorage.setItem('posts', JSON.stringify([...posts, newPost]))
        } catch (error) {
            console.error(error)
        }
    }

    const editPost = async (post: Post) => {
        try {
            const currentPostIndex = posts.findIndex((p) => p.id === post.id)

            if (currentPostIndex === -1) {
                throw new Error('Post not found')
            }
            if (post.password !== posts[currentPostIndex].password) {
                throw new Error('パスワードが一致しません')
            }

            posts[currentPostIndex].name = post.name
            posts[currentPostIndex].content = post.content
            setPosts((posts) => [...posts])
        } catch (error) {
            console.error(error)
        }
    }

    return {
        posts,
        addPost,
        editPost,
    }
}
