import { atom } from "recoil";

export const uploaderAtom = atom({
	key: "uploader",
	//default is it is getting from local storage
	default: localStorage.getItem("uploader-edw")
		? JSON.parse(localStorage.getItem("uploader-edw"))
		: null,
});
