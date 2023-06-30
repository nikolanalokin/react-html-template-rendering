import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import { App } from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Main } from './pages/Main'
import { Product } from './pages/Product'
import { ProductDetails } from './pages/ProductDetails'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '',
                element: <Main />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'product/details',
                element: <ProductDetails />
            },
        ]
    },
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
)
