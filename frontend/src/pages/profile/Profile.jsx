import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, Email, MoreVert } from '@mui/icons-material'
import Posts from '../../components/posts/Posts'
import './profile.scss'

const Profile = () => {
	return (
		<div className='profile'>
			<div className="images">
				<img src="https://images.unsplash.com/photo-1558980395-2f289089d3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" alt="" className="cover" />
				<img src="https://images.unsplash.com/photo-1611004061262-3a925aa7fc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80" alt="" className="profile" />
			</div>
			<div className="profileContainer">
				<div className="profileDetails">
					<div className="top">
						<Email />
						<MoreVert />
					</div>
					<div className="center">
						<span>Timothy White</span>
						<div className="info">
							<div className="item">
								<Place />
								Canada
							</div>
							<div className="item">
								<Language />
								<span>ramontabilin.vercel.app</span>
							</div>
						</div>
						<div className="bottom">
							<div className="socials">
								<a href="www.google.com">
									<FacebookTwoTone fontSize='large' />
								</a>
								<a href="www.google.com">
									<Instagram fontSize='large' />
								</a>
								<a href="www.google.com">
									<Twitter fontSize='large' />
								</a>
								<a href="www.google.com">
									<LinkedIn fontSize='large' />
								</a>
								<a href="www.google.com">
									<Pinterest fontSize='large' />
								</a>
							</div>
							<button>Folow</button>
						</div>
					</div>
				</div>
				<Posts />
			</div>
		</div>
	)
}

export default Profile