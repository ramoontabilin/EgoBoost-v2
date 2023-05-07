import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { makeRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'

const Suggestions = () => {
	const { isLoading, error, data: users } = useQuery(["suggestions"], () =>
		makeRequest.get(`api/v1/follow/suggest`).then(res => {
			// console.log(res.data.data[0].result)
			return res.data.data[0].result
		})
	)

	return (
		<div className="item">
			<span>Suggestions For You</span>
			{isLoading ? "Loading" :
				users ? users.map((user) => (
					<div className="user" key={user._id}>
						<div className="userInfo">
							<Link to={`/profile/${user._id}`}>
								<img src={user.image ? user.image : noImage} alt={user.name} />
							</Link>
							<span>{user.name}</span>
						</div>
						<div className="buttons">
							<button>Follow</button>
							<button>Ignore</button>
						</div>
					</div>
				)) : "No more suggestions.. :c"
			}
			{/* <span>Damn.. No more recommendations..</span> */}
		</div >
	)
}

export default Suggestions