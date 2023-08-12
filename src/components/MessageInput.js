import { useState } from "react";

import {
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Box,
	Divider,
} from "@mui/material";

import Send from "@mui/icons-material/Send";

const MessageInput = ({ handleSendMessage, disabled }) => {
	const [inputMessage, setInputMessage] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey && inputMessage.length > 0) {
			e.preventDefault();
			handleSendMessage(inputMessage);
			setInputMessage("");
		}
	};

	return (
		<Box px={10}>
			<FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
				<OutlinedInput
					maxRows={3}
					id="message-input-box"
					type="text"
					placeholder="Type your message..."
					multiline
					disabled={disabled}
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					endAdornment={
						<InputAdornment position="end">
							<Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
							<IconButton
								disabled={disabled || inputMessage.length < 1}
								aria-label="send message"
								onClick={() => {
									handleSendMessage(inputMessage);
									setInputMessage("");
								}}
								edge="end"
							>
								{<Send />}
							</IconButton>
						</InputAdornment>
					}
					sx={{
						pl: 5,
						pr: 4,
						borderRadius: "20px 20px",
						boxShadow: "0 10px 10px -10px grey",
					}}
				/>
			</FormControl>
		</Box>
	);
};

export default MessageInput;
