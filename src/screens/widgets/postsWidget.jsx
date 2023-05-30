import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./postWidget";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
// import {posts} from "./data.js";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);

	// console.log(posts);
	// console.log(token);
	// const _id = "0";
	// const userId ="64706ed762edc84a05a2e361";
	// const firstName= "Steve";
	// const lastName= "Ralph";
	// const location= "New York, CA";
	// const description= "Some really long random description";
	// const picturePath= "post1.jpeg";
	// const userPicturePath= "p3.jpeg";
	// const likes= [];
	// const comments= [
	//         "random comment",
	//         "another random comment",
	//         "yet another random comment",
	//       ];

	// const data = [
	//   {
	//     _id: "0",
	//     userId: "64706ed762edc84a05a2e361",
	//     firstName: "Steve",
	//     lastName: "Ralph",
	//     location: "New York, CA",
	//     description: "Some really long random description",
	//     picturePath: "post1.jpeg",
	//     userPicturePath: "p3.jpeg",
	//     likes: [],
	//     comments: [
	//       "random comment",
	//       "another random comment",
	//       "yet another random comment",
	//     ],
	//   },
	//   {
	//     _id: "0",
	//     userId: "64706ed762edc84a05a2e361",
	//     firstName: "Steve",
	//     lastName: "Ralph",
	//     location: "New York, CA",
	//     description: "Some really long random description",
	//     picturePath: "post1.jpeg",
	//     userPicturePath: "p3.jpeg",
	//     likes: [],
	//     comments: [
	//       "random comment",
	//       "another random comment",
	//       "yet another random comment",
	//     ],
	//   },
	// ];

	const getPosts = async () => {
		const response = await fetch("https://social-butterfly-server.onrender.com/posts", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	const getUserPosts = async () => {
		const response = await fetch(
			`https://social-butterfly-server.onrender.com/posts/${userId}/posts`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();

		dispatch(setPosts({ posts: data }));
	};

	useEffect(() => {
		if (isProfile) {
			// getPosts();
			getUserPosts();
		} else {
			getPosts();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{posts.length === 0 ? (
				<Box
					width="100%"
					padding="4rem 4rem"
					textAlign="center"
					// justifyContent="center"
					// m="2rem 6rem"
				>
					<Typography>No Posts</Typography>
				</Box>
			) : (
				posts.map(
					({
						_id,
						userId,
						firstName,
						lastName,
						description,
						location,
						picturePath,
						userPicturePath,
						likes,
						comments,
					}) => (
						<PostWidget
							key={_id}
							postId={_id}
							postUserId={userId}
							name={`${firstName} ${lastName}`}
							description={description}
							location={location}
							picturePath={picturePath}
							userPicturePath={userPicturePath}
							likes={likes}
							comments={comments}
						/>
					)
				)
			)}
		</>
	);
};

export default PostsWidget;
