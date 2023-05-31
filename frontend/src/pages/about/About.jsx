import "./about.scss"

const About = () => {
	return (
		<div className="about">
			<div className="container">
				<div className="section header">
					<span>What is this?</span>
					<p>EgoBoost is a parody of other social media websites designed for individuals who crave attention and recognition from others. We provide a platform for users to boast about their talents, achievements, and personal lives in hopes of gaining likes, followers, and comments. We encourage the use of the built in AI to create positive posts tailored for maximum engagement. We also allow users to connect with other like-minded individuals who share the same desire for attention-seeking behavior.</p>
				</div>
				<hr />
				<div className="section">
					<span>Tech used</span>
					<ul>
						<li>OpenAI for AI post creation</li>
						<li>MongoDB for the database</li>
					</ul>
				</div>
				<hr />
				<div className="section">
					<span>Contact me</span>
					<p>ramon.tabilin@gmail.com</p>
					<a href="https://ramontabilin.vercel.app">my site</a>
				</div>
			</div>
		</div>
	)
}

export default About