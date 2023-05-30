import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "screens/navBar";
import UserWidget from "screens/widgets/userWidget";
import PostWidget from "screens/widgets/myPostWidget";
import PostsWidget from "screens/widgets/postsWidget";
import FriendListWidget from "screens/widgets/friendListWidget";

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
	const { _id, picturePath } = useSelector((state) => state.user);
	// const _id = "64706ed762edc84a05a2e361";
	// const picturePath = "p4.jpeg";
	// console.log(token);

	return (

		<>
			<NavBar style={{ position: "fixed", top: 0, left:0,  zIndex: 9999 }} />
			<Box>
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between"
				position="relative"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}

				>
					<PostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} />
				</Box>
				{isNonMobileScreens && (
					<Box flexBasis="26%">
						<Box m="2rem 0" />
						<FriendListWidget userId={_id} />
					</Box>
				)}
			</Box>
		</Box>
		</>
		
	);	
};

export default HomePage;
