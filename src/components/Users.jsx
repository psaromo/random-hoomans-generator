import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaHome, FaTransgender, FaBook } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Users = () => {
	// State
	const [userProfile, setUserProfile] = useState([]);
	const [favoriteComic, setFavoriteComic] = useState([]);

	// API async function
	const fetchComics = async () => {
		// Run random number
		let randomNum = Math.floor(Math.random() * 1000);
		// Apply the random number as comic id of the link

		const data = await fetch("ttps://icanhazdadjoke.com/j/");

		// Transform data to JSON
		const detailData = await data.json();
		// Set the data to the favoriteComic state
		setFavoriteComic(detailData);
		console.log(detailData);
	};
	// Fetch Users
	const fetchData = async () => {
		const data = await fetch("https://randomuser.me/api/?results=10");
		// Transform data to JSON
		const detailData = await data.json();
		// Set the data to the userProfile state
		setUserProfile(detailData.results);
	};

	// Run the function once User.jsx mounts
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='allCards'>
			{userProfile.map((user) => {
				return (
					<div className='card' key={user.login.uuid}>
						<div className='photo'>
							<img src={user.picture.thumbnail} alt={user.name.first} />
						</div>

						<div className='user'>
							<div className='userInfo'>
								<h2>
									{user.name.first}&nbsp;{user.name.last}
								</h2>

								<p className='gender'>
									<FaTransgender className='icon' /> {user.gender}
								</p>
								<p>
									<AiOutlineMail className='icon' /> {user.email}
								</p>
								<p>
									<FaHome className='icon' />
									{user.location.street.number}
									{user.location.street.name}
									{user.location.city}, {user.location.state},
									{user.location.postcode}
								</p>
								<p>
									<FaBook className='icon' /> Favorite Comic Book:
									{favoriteComic.joke}
								</p>
							</div>
							<div className='phoneButton'>
								<button className='phone'>
									<FaPhoneAlt />
									{user.phone}
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Users;
