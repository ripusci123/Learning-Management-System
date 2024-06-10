import { atom } from "recoil";

export const userAtom = atom({
	key: "user",
	//default is it is getting from local storage
	default: localStorage.getItem("user-edw")
		? JSON.parse(localStorage.getItem("user-edw"))
		: null,
});
