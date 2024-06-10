import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<ChakraProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</RecoilRoot>
	</React.StrictMode>
);
