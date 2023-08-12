import React, { Fragment, useContext, useRef, useEffect } from "react";
import { Typography, Box, ListItemAvatar, Avatar, Grid } from "@mui/material";
import { MainContext, SocketContext } from "../contexts";
import Chat from "../assets/sync.svg";
import ThreadAppBar from "./ThreadAppBar";
import MessageInput from "./MessageInput";
import MessageStatus from "./MessageStatus";

const colorPicker = (char = "a") => {
	const colors = [
		"#C8553D",
		"#FF8200",
		"#CC59D2",
		"#FDE12D",
		"#F487B6",
		"#CB807D",
		"#276FBF",
		"#20A39E",
		"#DA4167",
	];

	const index = char.charCodeAt(0) % colors.length;
	return colors[index];
};

const ThreadView = () => {
	const { threads, selectedThread } = useContext(MainContext);
	const { isConnected, SendMessage } = useContext(SocketContext);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [threads, selectedThread]);

	const handleSendMessage = (message) => {
		scrollToBottom();
		const [firstMessage] = threads[selectedThread];
		SendMessage({
			address: firstMessage.address,
			body: message,
			date: Date.now(),
			displayName: firstMessage.displayName,
			errorCode: null,
			read: 0,
			threadId: firstMessage.threadId,
			type: 2,
		});
	};

	if (selectedThread === null) {
		return (
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				height={"100vh"}
			>
				<Grid item>
					<img src={Chat} alt="Chat svg" width={"300px"} />
				</Grid>
				<Grid item sx={{ mt: 5 }}>
					<Typography variant="h6" color="textSecondary" textAlign="center">
						Keep your phone online
					</Typography>
					<Typography variant="body2" color="textSecondary" textAlign="center">
						Your phone is paired so you can use this device to stay connected
					</Typography>
				</Grid>
			</Grid>
		);
	}

	return (
		<Fragment>
			<ThreadAppBar
				title={
					threads[selectedThread][0].displayName ||
					threads[selectedThread][0].address
				}
			/>
			<Box px={10} height="80vh" overflow={"auto"}>
				{threads[selectedThread].map((message, index) => {
					const isSentByCurrentUser = message.type === 2;
					const bgColor = colorPicker(message.address);
					const messageColor = isSentByCurrentUser ? "#F4F2F3" : "#e0e0e0";

					return (
						<Box key={index} p={2}>
							<Grid
								container
								display="flex"
								direction={isSentByCurrentUser ? "row-reverse" : "row"}
								wrap="nowrap"
							>
								<ListItemAvatar>
									<Avatar
										alt={message.displayName || message.address}
										src={message.displayName}
										sx={{
											bgcolor: bgColor,
											color: "white",
											mx: 2,
										}}
									/>
								</ListItemAvatar>

								<Typography
									bgcolor={messageColor}
									p={1}
									borderRadius={"10px"}
									color={"#000"}
									sx={{ wordBreak: "break-word" }}
									maxWidth={"50%"}
								>
									{message.body}
									{isSentByCurrentUser && (
										<MessageStatus status={message.statusCode} />
									)}
								</Typography>
							</Grid>

							<Typography
								variant="body2"
								fontSize={10}
								color="textSecondary"
								m={1}
								ml={isSentByCurrentUser ? 0 : 10}
								mr={isSentByCurrentUser ? 10 : 0}
								textAlign={isSentByCurrentUser ? "right" : "left"}
							>
								{new Date(message.date).toLocaleString()}
							</Typography>
						</Box>
					);
				})}
				<div ref={messagesEndRef} />
			</Box>
			<MessageInput
				handleSendMessage={handleSendMessage}
				disabled={!isConnected}
			/>
		</Fragment>
	);
};

export default ThreadView;
