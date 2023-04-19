import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import './comments.scss'

const Comments = () => {
	const { currentUser } = useContext(AuthContext)

	const comments = [
		{
			id: 1,
			user: {
				name: 'Sam Sharbot',
				id: 6,
				img: 'https://images.unsplash.com/photo-1491243658503-56c102aab1a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
			},
			desc: "I love seeing all of the beautiful places you're discovering on your hikes! Your photos always make me feel like I'm right there with you. Can't wait to see where you explore next!"
		},
		{
			id: 2,
			user: {
				name: 'Ian Halberd',
				id: 3,
				img: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
			},
			desc: "Wow, those views are absolutely breathtaking! It's inspiring to see you pushing yourself to new heights (literally and figuratively) on your hikes. Keep up the great work!"
		},
	]

	return (
		<div className='comments'>
			<div className="write">
				<img src={currentUser.image} alt={currentUser.name} />
				<input type="text" placeholder='Say something good!' />
				<button>Send</button>
			</div>
			{comments.map((comment) => (
				<div className="comment">
					<img src={comment.user.img} alt={comment.user.name} />
					<div className="info">
						<span>{comment.user.name}</span>
						<p>{comment.desc}</p>
					</div>
					<span className='date'>2 hours ago</span>
				</div>
			))}
		</div>
	)
}

export default Comments