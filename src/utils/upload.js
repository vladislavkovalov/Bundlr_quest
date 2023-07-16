import { getBundlr } from "./get-bundlr";


export const upload = async (data) => {
	data.appId = "onlybundlr";
	const bundlr = await getBundlr();
	try {
		const serialized = JSON.stringify(data);
	
		const price = await bundlr.getPrice(new Blob([serialized]).size);
		const balance = await bundlr.getLoadedBalance();
	
		if (price.isGreaterThanOrEqualTo(balance)) {
		  console.log("Funding");
		  await bundlr.fund(price);
		} 
		else {
		  console.log("Funding not needed, balance sufficient.");
		}
	
		const tx = await bundlr.upload(serialized, {
		  tags: [{ name: "Content-Type", value: "application/json" }],
		});
	
		console.log(`Json uploaded success content to https://arweave.net/${tx.id}`);
	
		return "https://arweave.net/"+ tx.id;
	} 
	catch(e) {
		console.log("Error on upload: "+e);
	}
};
