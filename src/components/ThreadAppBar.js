import React, { useState } from "react";
import {
	AppBar,
	Typography,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const ThreadAppBar = ({ title, menuItems }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar component="nav" position="sticky" sx={{ height: 50 }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">{title}</Typography>
				{menuItems && menuItems.length > 0 && (
					<div>
						<Menu
							id="menu"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							{menuItems &&
								menuItems.map((item, index) => (
									<MenuItem
										key={index}
										onClick={() => {
											item.onClick();
											handleMenuClose();
										}}
									>
										{item.icon}
										{item.label}
									</MenuItem>
								))}
						</Menu>
						<IconButton
							color="inherit"
							aria-controls="menu"
							aria-haspopup="true"
							onClick={handleMenuClick}
						>
							<MoreVert />
						</IconButton>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default ThreadAppBar;
