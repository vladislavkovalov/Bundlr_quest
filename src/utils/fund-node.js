import { getBundlr } from "./get-bundlr";


export const fundNode = async (fundAmount) => {
	try {
		const bundlr = await getBundlr();	
		const fundAmountAtomic = bundlr.utils.toAtomic(fundAmount);
		const tx = await bundlr.fund(fundAmountAtomic);
		return "Node funded";
	} 
	catch (e) {
		console.log("Error on fund ", e);
		return "Error on fund: " + e;
	}
	return "";
};
