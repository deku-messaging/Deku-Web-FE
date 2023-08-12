import { Typography } from "@mui/material";
import { DoneAll, Done, Sync, Error } from "@mui/icons-material";

const MessageStatus = ({ status }) => {
	const isSent = status === 0;
	const isDelivered = status === 1;
	const isFailed = status === 2;
	const isSending = status === 3;
	const fontSize = "10";

	return (
		<Typography component="span" display="block" textAlign="right" height={10}>
			{isSent && <Done fontSize={fontSize} color={"primary"}/>}
			{isDelivered && <DoneAll fontSize={fontSize} color={"primary"}/>}
			{isFailed && <Error fontSize={fontSize} color={"error"} />}
			{isSending && <Sync fontSize={fontSize} />}
		</Typography>
	);
};

export default MessageStatus;
