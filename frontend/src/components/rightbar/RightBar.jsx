import Suggestions from '../suggestions/Suggestions'
import './rightbar.scss'

const Rightbar = () => {
	return (
		<div className='rightbar'>
			<div className="container">
				<Suggestions />
				<div className="item">
					<span>Latest Activities</span>
					<div className="user">
						<div className="userInfo">
							<img src="https://images.unsplash.com/photo-1595875708571-854a3492c245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80" alt="" />
							<p>
								<span>Jared Mathews </span>
								posted a story!
							</p>
						</div>
						<span>30 seconds ago</span>
					</div>
					<div className="user">
						<div className="userInfo">
							<img src="https://images.unsplash.com/photo-1595875708571-854a3492c245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80" alt="" />
							<p>
								<span>Jared Mathews </span>
								changed their profile picture!
							</p>
						</div>
						<span>2 mins ago</span>
					</div>
					<div className="user">
						<div className="userInfo">
							<img src="https://images.unsplash.com/photo-1595875708571-854a3492c245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80" alt="" />
							<p>
								<span>Jared Mathews </span>
								posted a story!
							</p>
						</div>
						<span>30 seconds ago</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Rightbar