import React, { useState } from "react";
import { uploadImage } from "../utils/upload-image";
import { useUpdateProfileImage } from "@lens-protocol/react";

const EditProfilePicture = ({ profile }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();
	const {
		execute: updateProfileImage,
		error: updateProfileImageError,
		isPending: updateProfileImagePending,
	} = useUpdateProfileImage({
		profile,
	});

	// Called when the user selects a file to be uploaded
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "upload"
	const doUpdateProfilePicture = async () => {
		try {
			setMessage("Uploading profile picture...");
			const newProfileURL = await uploadImage(fileToUpload, fileType);
			await updateProfileImage(newProfileURL);
			setMessage("Profile picture updated successfully!");
		  } catch (error) {
			setMessage("Error updating profile picture");
			console.log("Error updating profile picture:", error);
		  }
	};

	return (
		<div className="w-[600px] mt-10 flex flex-col  bg-primary px-1 py-1 rounded-lg mb-10">
			<label className="font-main block uppercase text-xs font-bold mb-2">Profile Picture</label>
			{profile?.picture && !fileToUpload && (
				<img width="600" src={profile.picture?.original.url} alt="profile_pic" />
			)}
			{fileToUpload && <img src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />}
			<div className="flex flex-row justify-start px-2 py-1 ">
				<input
					type="file"
					onChange={handleFile}
					className="px-2 text-sm text-white rounded-lg w-full"
					multiple="single"
					name="files[]"
				/>
				<div className="flex flex-row justify-end align-start w-full bg-primary ">
					<span className="font-main text-message mr-5">{message}</span>

					<button
						className="font-main px-5 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
						disabled={txActive}
						onClick={() => doUpdateProfilePicture()}
					>
						upload
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePicture;