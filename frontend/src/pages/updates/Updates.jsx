import React from 'react'

import './updates.scss'

const Updates = () => {
	return (
		<div className="updates">
			<div className="container">
				<div className="section header">
					<span>What's New 💫</span>
					<p>This page ig.</p>
				</div>
				<hr />
				<div className="section">
					<span>Known bugs</span>
					<ul>
						<li>Name and picture doesn't change locally when saving new name</li>
					</ul>
				</div>
				<hr />
				<div className="section">
					<span>Todo</span>
					<ul>
						<li>Follow list</li>
						<li>Liked posts</li>
						<li>Close sidebar on mobile after selecting item</li>
						<li>Animations for basic elements</li>
						<li>Search</li>
						<li>Latest activities from followed</li>
						<li>Delete account</li>
					</ul>
				</div>

			</div>
		</div>
	)
}

export default Updates