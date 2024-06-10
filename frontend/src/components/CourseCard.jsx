import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../framer-utils/framer";
import { useNavigate } from "react-router-dom";
export function CourseCard({
	src,
	title,
	delay,
	price,
	description,
	uploader,
	btnText,
	poster,
	isUploader,
	handleDeleteCourse,
	courseId,
}) {
	const navigate = useNavigate();

	return (
		<motion.div
			initial="hidden"
			whileInView={"show"}
			variants={fadeIn("up", delay, 0.6)}
			viewport={{ once: true }}
			whileHover={{ scale: 1.05 }}
			className="max-w-[320px] w-full rounded-md border bg-white cursor-pointer flex flex-col"
		>
			<div className="p-2">
				<img
					src={poster?.url || src}
					alt="Laptop"
					className="max-h-[150px] w-full rounded-md object-cover"
				/>
			</div>
			<div className="p-4 flex-1 flex flex-col">
				<h1 className="text-lg font-semibold mb-4 h-16 line-clamp-2">
					{title}
				</h1>
				<div className="w-full flex justify-between items-center">
					<p className="text-orange-500 text-lg font-semibold">
						Rs.{price}
					</p>
					<p className="text-xs font-medium">- {uploader}</p>
				</div>
				<p className="mt-2 text-xs font-medium text-gray-600">
					{description}
				</p>
				<div className="mt-auto pt-5">
					{!isUploader && (
						<button
							type="button"
							className="mt-3 rounded-sm bg-[#f8c365] px-3 py-2 text-[10px] font-semibold  shadow-sm hover:bg-[#f5b951] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							onClick={(e) => {
								e.preventDefault();
								navigate(`/course/${courseId}`);
							}}
						>
							{btnText}
						</button>
					)}
					{isUploader && (
						<button
							type="button"
							className="mt-3 rounded-sm bg-[#f8c365] px-3 py-2 text-[10px] font-semibold  shadow-sm hover:bg-[#f5b951] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black float-right"
							onClick={(e) => {
								e.preventDefault();
								navigate(`/instructor/course/${courseId}`);
							}}
						>
							Go to Course
						</button>
					)}
					{isUploader && (
						<div className="mt-2">
							<button
								className="bg-red-500 hover:bg-red-600 text-xs text-white px-2 py-1 rounded-md"
								onClick={() => {
									if (
										confirm(
											"Are you sure to delete this course?"
										)
									)
										handleDeleteCourse(courseId);
									console.log("Deleted");
								}}
							>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default CourseCard;
