import { useContext, useState } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Leftbar from './components/leftbar/Leftbar'
import Navbar from './components/navbar/Navbar'
import Rightbar from './components/rightbar/RightBar'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/authContext'
import './style.scss'
import './App.scss'


const App = () => {
	const [showSidebar, setShowSidebar] = useState(false)
	const { currentUser } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
	const queryClient = new QueryClient()

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar)
	}

	const Layout = () => (
		<QueryClientProvider client={queryClient}>
			<div className={`theme-${darkMode ? 'dark' : 'light'}`}>
				<Navbar onClick={toggleSidebar} />
				<div className='main'>
					<Leftbar active={showSidebar} />
					<div className='outlet'>
						<Outlet />
					</div>
					<Rightbar />
				</div>
			</div>
		</QueryClientProvider>
	)

	const ProtectedRoute = ({ children }) => {
		return currentUser ? children : <Navigate to='/login' />
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: '/',
					element: <Home />
				},
				{
					path: '/profile/:id',
					element: <Profile />
				},
				{
					path: '/followings',
					element: <Settings />
				},
				{
					path: '/settings',
					element: <Settings />
				},
			]
		},
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/register',
			element: <Register />
		},
	])

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	)
}

export default App