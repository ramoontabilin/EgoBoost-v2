import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import './stories.scss'

const Stories = () => {
	const { currentUser } = useContext(AuthContext)

	const stories = [
		{
			id: 1,
			name: 'Jared Mathews',
			img: 'https://images.unsplash.com/photo-1632739186203-d42f6ee72f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80'
		},
		{
			id: 2,
			name: 'Natalie Carlson',
			img: 'https://images.unsplash.com/photo-1530868156061-e5e8a5450c51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
		},
		{
			id: 3,
			name: 'Ian Halberd',
			img: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80'
		},
		{
			id: 4,
			name: 'Emily Stout ',
			img: 'https://images.unsplash.com/photo-1532105111962-e23707867985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
		},
		{
			id: 5,
			name: 'Will Sherberd',
			img: 'https://images.unsplash.com/photo-1626453144148-2f1a5381734c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
		},
		{
			id: 6,
			name: 'Sam Sharbot',
			img: 'https://images.unsplash.com/photo-1491243658503-56c102aab1a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
		},
	]

	return (
		<div className='stories'>
			<div className="story">
				<div className='gradient' />
				<img src={currentUser.image} alt={currentUser.name} />
				<span>{currentUser.name}</span>
				<button>+</button>
			</div>
			{stories.map((story) => (
				<div className="story" key={story.id}>
					<div className='gradient' />
					<img src={story.img} alt={story.name} />
					<span>{story.name}</span>
				</div>
			))}
		</div>
	)
}

export default Stories