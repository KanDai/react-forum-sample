export type Post = {
    id: number
    name: string
    content: string
    password: string
}

export type AddPostRequest = Omit<Post, 'id'>

export type GetPostResponse = Omit<Post, 'id' | 'password'>
