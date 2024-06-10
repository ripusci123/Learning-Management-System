import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import AuthSelect from "./pages/AuthSelect";
import MyCourses from "./pages/MyCourses";
import Course from "./pages/Course";
import Footer from "./components/Footer";
import UserAuth from "./pages/UserAuth";
import InstructorAuth from "./pages/instructor/InstructorAuth";
import Video from "./pages/Video";
import { useRecoilState } from "recoil";
import { userAtom } from "./atoms/userAtom";
import { useEffect } from "react";
import { uploaderAtom } from "./atoms/uploaderAtom";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import UploadCourse from "./pages/instructor/UploadCourse";
import CoursePage from "./pages/instructor/CoursePage";
import Profile from "./components/Profile";

function App() {
	const [user] = useRecoilState(userAtom);
	const [uploader] = useRecoilState(uploaderAtom);

	useEffect(() => {
		if (user) {
			window.localStorage.setItem("user-edw", JSON.stringify(user));
		} else {
			window.localStorage.removeItem("user-edw");
		}
	}, [user]);

	useEffect(() => {
		if (uploader) {
			window.localStorage.setItem(
				"uploader-edw",
				JSON.stringify(uploader)
			);
		} else {
			window.localStorage.removeItem("uploader-edw");
		}
	}, [uploader]);

	return (
		<div className="w-full bg-[#f8c365] min-h-[100dvh] [&>div]:min-h-screen">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/auth" element={user||uploader?<Home />:<AuthSelect />} />
				<Route path="/userAuth" element={<UserAuth />} />
				<Route path="/mycourses" element={user?<MyCourses />:<AuthSelect/>} />
				<Route path="/profile" element={user ? <Profile /> : <AuthSelect/>} />
				<Route path="/course/:courseId" element={user?<Course />:<AuthSelect/>} />
				<Route path="/videos/:courseId" element={user?<Video />:<AuthSelect/>} />

				<Route path="/instructorAuth" element={<InstructorAuth />} />
				<Route path="/instructor/dashboard" element={uploader?<InstructorDashboard />:<AuthSelect />} />
				<Route path="/instructor/upload-course" element={uploader?<UploadCourse />:<AuthSelect />} />
				<Route path="/instructor/profile" element={uploader ? <Profile isInstructor /> : <AuthSelect/>} />
				<Route path="/instructor/course/:courseId" element={uploader?<CoursePage />:<AuthSelect />} />

			</Routes>
			<Footer />
		</div>
	);
}

export default App;
