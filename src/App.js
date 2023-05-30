import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "screens/homePage";
import LoginPage from "screens/loginPage";
import ProfilePage from "screens/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// App
function App() {
	//mode - theme -isAuth
	const mode = useSelector((state) => state.mode);
	// eslint-disable-next-line
	const theme = useMemo(() => createTheme(themeSettings(mode)));
	const isAuth = Boolean(useSelector((state) => state.token));
	// const isAuth = true;

	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route
							path="/home"
							element={
								isAuth ? <HomePage /> : <Navigate to="/" />
							}
						/>
						<Route
							path="/profile/:userId"
							element={
								isAuth ? <ProfilePage /> : <Navigate to="/" />
							}
						/>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
