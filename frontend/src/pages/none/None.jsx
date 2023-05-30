import { QuestionMark } from "@mui/icons-material"
import "./none.scss"

const None = () => {
	return (
		<div className="none">
			<div className="message">
				<QuestionMark />
				<span>Damn.. nothing here.. yet?</span>
			</div>
		</div>
	)
}

export default None