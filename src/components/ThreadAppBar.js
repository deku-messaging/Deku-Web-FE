import { AppBar, Typography, Toolbar } from "@mui/material";
const ThreadAppBar = ({ title }) => {
	return (
		<AppBar component="nav" position="sticky" sx={{ height: 50 }}>
			<Toolbar>
				<Typography variant="h6">{title}</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default ThreadAppBar;
