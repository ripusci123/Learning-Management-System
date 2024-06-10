import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { uploaderAtom } from "../atoms/uploaderAtom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Profile({ isInstructor = false }) {
	const [user] = useRecoilState(userAtom);
	const [uploader] = useRecoilState(uploaderAtom);

	const navigate = useNavigate();

	const imageSrc = useMemo(() => {
		if (user) return user.avatar.url;
		if (uploader) return uploader.avatar.url;

		return "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
	}, [uploader, user]);

	useEffect(() => {
		console.log(user, uploader);
		if (user || uploader) return;
		navigate("/auth");
	}, [navigate, uploader, user]);

	return (
		<div className="flex items-center py-20 flex-col">
			<div className="sm:mx-auto sm:w-full sm:max-w-xl py-10 px-5 bg-white rounded-xl text-2xl space-y-5 text-center">
				<div className="flex items-center justify-between gap-10 mb-10 mx-auto">
					<img
						className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto"
						src={imageSrc}
						alt="Bonnie image"
					/>
				</div>

				<div>
					<div className="block text-xl font-bold leading-6 text-gray-900">
						Full Name
					</div>
					<div className="">{(user || uploader)?.fullName}</div>
				</div>

				<div>
					<div className="block text-xl font-bold leading-6 text-gray-900">
						Email address
					</div>
					<div className="">{(user || uploader)?.email}</div>
				</div>

				{isInstructor && (
					<>
						<div>
							<div className="block text-xl font-bold leading-6 text-gray-900">
								Experience
							</div>
							<div className="">{uploader?.experience} years</div>
						</div>

                        <div>
							<div className="block text-xl font-bold leading-6 text-gray-900">
								Company
							</div>
							<div className="">{uploader?.company}</div>
						</div>

                        <div>
							<div className="block text-xl font-bold leading-6 text-gray-900">
								Designation
							</div>
							<div className="">{uploader?.designation}</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Profile;
