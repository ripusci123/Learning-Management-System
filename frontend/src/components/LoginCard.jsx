import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { uploaderAtom } from "../atoms/uploaderAtom";
import { useToast } from "@chakra-ui/react";

function LoginCard({ isInstructor = false }) {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const [user, setUser] = useRecoilState(userAtom);
	const [uploader, setUploader] = useRecoilState(uploaderAtom);

	const navigate = useNavigate();

	const toast = useToast({ isClosable: true });

	useEffect(() => {
		if (user) return navigate("/courses");
		else if (uploader) return navigate("/instructor/dashboard");
	}, [navigate, uploader, user]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				!isInstructor ? "/api/user/login" : "/api/uploader/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const data = await res.json();
			console.log(data);
			if (data.success === false) {
				console.log("Error occurred");
				toast({
					title: "An error occurred.",
					description: data.message,
					status: "error",
				});
			} else {
				console.log("sign in successfully", data);
				isInstructor ? setUploader(data.data) : setUser(data.data);
			}
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white py-10 px-5 rounded-lg">
			<form className="space-y-6" onSubmit={handleLogin}>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
							onChange={(e) =>
								setInputs({ ...inputs, email: e.target.value })
							}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Password
					</label>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							onChange={(e) =>
								setInputs({
									...inputs,
									password: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginCard;
