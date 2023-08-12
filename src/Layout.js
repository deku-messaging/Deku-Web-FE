import { Box, Grid, Divider } from "@mui/material";

const Layout = ({ children }) => (
	<Box sx={{ flexGrow: 1 }}>
		<Grid container>
			<Grid item xs={3}>
				{children[0]}
			</Grid>

			<Divider flexItem orientation="vertical" sx={{ mr: "-1px" }} />

			<Grid item xs={9}>
				{children[1]}
			</Grid>
		</Grid>
	</Box>
);

export default Layout;
