import { useContext } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Leftbar from './components/leftbar/Leftbar'
import Navbar from './components/navbar/Navbar'
import Rightbar from './components/rightbar/RightBar'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/authContext'
import './style.scss'


const App = () => {
	const { currentUser } = useContext(AuthContext)
	const { darkMode } = useContext(DarkModeContext)
	const queryClient = new QueryClient()

	const Layout = () => (
		<QueryClientProvider client={queryClient}>
			<div className={`theme-${darkMode ? 'dark' : 'light'}`}>
				<Navbar />
				<div style={{ display: 'flex' }}>
					<Leftbar />
					<div style={{ flex: 5 }}>
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