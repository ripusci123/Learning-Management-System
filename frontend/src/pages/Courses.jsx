import React, { useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Container from "../components/Container";

function Courses() {
	const [data, setData] = React.useState([]);

	useEffect(() => {
		fetch("/api/user/all-courses")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setData(data.data);
			});
	}, []);

	return (
		<Container>
			
			{
				data.length === 0 && (
					<div className="w-full">
						<h3 className="text-center w-full text-2xl font-semibold">No Course Available</h3>
					</div>
				)
			}
			<div className="grid grid-cols-1 md:grid-cols-4  gap-5">
				{
					data.map((course, index) => {
						return (
							<div
								className="mx-auto flex justify-items-start"
								key={index}
							>
								<CourseCard
									delay={0}
									btnText={"Go to Course"}
									key={course._id}
									title={course.courseTitle}
									src={course.src}
									description={course.description}
									price={course.price}
									poster = {course.poster}
									uploader={course.uploaderName}
									courseId={course._id}
								/>
							</div>
						);
					})}
			</div>
		</Container>
	);
}

export default Courses;
