import { Fragment, useContext } from "react";
import {
	Divider,
	List,
	ListItem,
	ListSubheader,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Badge,
	Typography,
	Skeleton,
} from "@mui/material";

import { formatDistanceToNow } from "date-fns";

import { MainContext } from "../contexts";
import { getThreadLabel } from "../utils/threadUtils";
import ThreadAppBar from "./ThreadAppBar";

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

const ThreadList = () => {
	const { threads, threadId, setThreadId, setSelectedThread } =
		useContext(MainContext);

	const handleThreadClick = (threadIndex) => {
		setSelectedThread(threadIndex);
		const selectedThread = threads[threadIndex];
		const [firstMessage] = selectedThread;
		const threadId = firstMessage.threadId;
		setThreadId(threadId);
	};

	const SkeletonThreadItem = () => (
		<Fragment>
			<ListSubheader sx={{ bgcolor: "background.paper" }}>
				{<Skeleton variant="text" />}
			</ListSubheader>
			<ListItem
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					py: 1.5,
				}}
			>
				<ListItemAvatar>
					<Skeleton variant="circular" width={40} height={40} />
				</ListItemAvatar>
				<ListItemText
					primary={<Skeleton variant="text" width={100} />}
					secondary={<Skeleton variant="text" width={150} />}
				/>
				<ListItemSecondaryAction>
					<Skeleton variant="circular" width={24} height={24} />
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</Fragment>
	);

	return (
		<Fragment>
			<ThreadAppBar title={"Messages"} />
			<List sx={{ height: "90vh", overflow: "auto" }}>
				{threads.length === 0
					? Array.from({ length: 5 }).map((_, index) => (
							<SkeletonThreadItem key={index} />
					  ))
					: threads.map((thread, index) => {
							const [firstMessage] = thread;
							const label = getThreadLabel(firstMessage.date);
							const unreadMessages = thread.filter((msg) => !msg.read);
							const badgeContent = unreadMessages.length;
							return (
								<Fragment key={index}>
									<ListSubheader sx={{ bgcolor: "background.paper" }}>
										{label}
									</ListSubheader>
									<ListItem
										onClick={() => handleThreadClick(index)}
										sx={{
											"bgcolor":
												threadId === firstMessage.threadId
													? "action.selected"
													: "",
											"cursor": "pointer",
											"&:hover": {
												bgcolor: "action.hover",
											},
										}}
									>
										<ListItemAvatar>
											<Avatar
												alt={firstMessage.displayName || firstMessage.address}
												src={firstMessage.displayName}
												sx={{
													bgcolor: colorPicker(firstMessage.address),
													color: "white",
												}}
											/>
										</ListItemAvatar>

										<ListItemText
											primary={firstMessage.displayName || firstMessage.address}
											secondary={
												<Fragment>
													<Typography
														variant="body2"
														component="span"
														display="block"
														sx={{ wordBreak: "break-word" }}
													>
														{firstMessage.body.length > 50
															? `${firstMessage.body.slice(0, 50)} ...`
															: firstMessage.body}
													</Typography>
													<Typography
														variant="caption"
														component="span"
														display="block"
														sx={{ wordBreak: "break-word" }}
													>
														{label.toLowerCase() === "today"
															? formatDistanceToNow(
																	new Date(firstMessage.date),
																	{
																		addSuffix: true,
																	}
															  )
															: new Date(firstMessage.date).toLocaleString()}
													</Typography>
												</Fragment>
											}
										/>
										{badgeContent > 0 && (
											<ListItemSecondaryAction>
												<Badge
													badgeContent={badgeContent}
													color="primary"
													sx={{ mr: 1.5 }}
												/>
											</ListItemSecondaryAction>
										)}
									</ListItem>
									<Divider />
								</Fragment>
							);
					  })}
			</List>
		</Fragment>
	);
};

export default ThreadList;
