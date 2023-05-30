import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/userImage";
import WidgetWrapper from "components/widgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const livefriends = useSelector((state) => state.user.friends);

	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	// userId = 8;

	const getUser = async () => {
		const response = await fetch(`https://social-butterfly-server.onrender.com/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		// const data = {
		// 	firstname: "Frey",
		// 	lastName: "Ray",
		// 	location : "India",
		// 	occupation : "student",
		// 	viewedProfile: 123,
		// impressions : 234,
		// friends: [],
		// }
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// const getFriends = async () => {
	// 	const response = await fetch(
	// 	  `http://localhost:3001/users/${userId}/friends`,
	// 	  {
	// 		method: "GET",
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	  }
	// 	);
	// 	const data = await response.json();
	// 	dispatch(setFriends({ friends: data }));
	//   };
	
	//   useEffect(() => {
	// 	getFriends();
	//   }, []);

	// useEffect(() => {
	// 	if (user) {
	// 	  setUser((prevUser) => ({ ...prevUser, friends: user.friends }));
	// 	}
	//   }, [user?.friends]); 

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions,
	} = user;

	return (
		<WidgetWrapper>
			{/* User name ROW */}
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}
			>
				<FlexBetween gap="2rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&:hover": {
									transform: "scale(1.025)",
									transition: "transform 0.3s ease-in",
									cursor: "pointer",
								},
							}}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>
							{livefriends.length} friends
						</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			{/* User details ROW */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem">
					<WorkOutlineOutlined
						fontSize="large"
						sx={{ color: main }}
					/>
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>

			<Divider />

			{/* Account details ROW */}
			<Box p="1rem 0">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>
						Peple Who've viewed your profile
					</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween>
					<Typography color={medium}>
						Impressions on your post
					</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>

			<Divider />

			{/* Social media ROW */}
			<Box p="1rem 0">
				<Typography
					fontSize="1rem"
					color={main}
					fontWeight="500"
					mb="1rem"
				>
					Social Profiles
				</Typography>

				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						<img src="../assets/twitter.png" alt="twitter" />
						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>
							<Typography color={medium}>
								Social Network
							</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>

				<FlexBetween gap="1rem">
					<FlexBetween gap="1rem">
						<img src="../assets/linkedin.png" alt="linkedin" />
						<Box>
							<Typography color={main} fontWeight="500">
								Linkedin
							</Typography>
							<Typography color={medium}>
								Professional Network
							</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
