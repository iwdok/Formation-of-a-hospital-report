import React from "react";
import "./App.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { createHashHistory } from "history";
import { Rover } from "./Components/Rovers/Rover";
import { RoverProvider } from "./Stores/roverStore/roverContext";


const App = () => {
	const customHistory = createHashHistory();
	
	return (
		<>
			<Router history={customHistory}>
				<Routes>
					<Route path="/" element={
						<RoverProvider>
							<Rover />
						</RoverProvider>
					} />
				</Routes>
			</Router>
		</>
	)
}

export default App;
