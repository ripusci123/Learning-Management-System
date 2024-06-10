import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { uploaderAtom } from "../atoms/uploaderAtom";
import {logo} from "../assets/index"
import "../../src/App.css";

function Header() {
	const [user, setUser] = useRecoilState(userAtom);
	const [uploader, setUploader] = useRecoilState(uploaderAtom);

	const avatar = useMemo(() => {
		if (user) return user.avatar.url;
		if (uploader) return uploader.avatar.url;

		return "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
	}, []);

	return (
		<header className="bg-[#f8c365] w-full flex justify-between md:px-36 p-5 font-[poppins]">
			<div className="flex justify-between items-center font-semibold text-sm gap-5">
				<ul className="hidden md:flex gap-5">
					<li>
						<NavLink to={"/"}  activeClassName="active">
							Home
						</NavLink>
					</li>
					{!uploader && (
						<li>
							<NavLink to={"/courses"} activeClassName="active">
								Courses
							</NavLink>
						</li>
					)}
					{user && !uploader && (
						<li>
							<NavLink to={"/mycourses"} activeClassName="active">
								My Courses
							</NavLink>
						</li>
					)}
					{uploader && (
						<li>
							<NavLink
								to={"/instructor/dashboard"}
								activeClassName="active"
							>
								Dashboard
							</NavLink>
						</li>
					)}
					{uploader && (
						<li>
							<NavLink
								to={"/instructor/upload-course"}
								activeClassName="active"
							>
								Upload Course
							</NavLink>
						</li>
					)}
				</ul>
			</div>
			<div className="font-bold text-2xl">
				<img className="h-10" src={logo} alt="Eduwave" />
			</div>

			<div className="flex justify-between items-center font-semibold text-sm gap-5 ">
				{user || uploader ? (
					// add a link to /profile with user||uploader avatar
					<div className="flex items-center gap-5">
						<Link to={user ? "/profile" : "/instructor/profile"}>
							<img
								className="w-10 h-10 rounded-full hover:shadow-[0_0_0_4px_orange]"
								src={avatar}
								alt="user"
							/>
						</Link>

						<button
							className="bg-black rounded-full px-5 py-2 text-white hidden md:inline-block"
							onClick={() => {
								setUser(null);
								setUploader(null);
								user && fetch("/api/user/logout");
								uploader && fetch("/api/uploader/logout");
							}}
						>
							<Link to={"/"}>Logout</Link>
						</button>
					</div>
				) : (
						<NavLink className="bg-black rounded-full px-5 py-2 text-white hidden md:inline-block active-btn hover:opacity-90" to={"/auth"}>Login / Signup</NavLink>
				)}
			</div>
		</header>
	);
}

export default Header;
