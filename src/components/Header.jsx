import videogames from "../assets/videogames.jpg";

const Header = () => {
	return (
		<>
			<header className="relative">
				<h2 className="absolute top-0 left-0 text-white p-4 text-4xl">
					Videogame Tracker
				</h2>
				<div className="w-screen h-40">
					<img
						src={videogames}
						alt="A series of videogame consoles"
						className="w-full h-full object-cover"
					/>
				</div>
			</header>
		</>
	);
};

export default Header;
import React from "react";
