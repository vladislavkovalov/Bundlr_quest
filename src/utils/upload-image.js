import fileReaderStream from "filereader-stream";
import { getBundlr } from "./get-bundlr";


export const uploadImage = async (fileToUpload, fileType) => {
	const bundlr = await getBundlr();

	try {
	  const dataStream = fileReaderStream(fileToUpload);
	  const price = await bundlr.getPrice(fileToUpload.size);
	  const balance = await bundlr.getLoadedBalance();
  
	  if (price.isGreaterThanOrEqualTo(balance)) {
		console.log("Funding node");
		await bundlr.fund(price);
	  } 
	  else {
		console.log("Funding not needed, balance sufficient :)");
	  }
  
	  const tx = await bundlr.upload(dataStream, {
		tags: [{ name: "Content-Type", value: fileType }],
	  });
  
	  console.log(`File uploaded ==> https://arweave.net/${tx.id}`);
  
	  return "https://arweave.net/" + tx.id;
	} 
	catch (e) {
	  console.log("Error on upload: ", e);
	}
};
