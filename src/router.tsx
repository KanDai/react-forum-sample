import { createBrowserRouter } from 'react-router-dom'
import { Root } from './pages'
import { PostNew } from './pages/PostNew'
import { PostEditor } from './pages/PostEditor'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/post/new',
        element: <PostNew />,
    },
    {
        path: '/post/:id/edit',
        element: <PostEditor />,
    },
])
