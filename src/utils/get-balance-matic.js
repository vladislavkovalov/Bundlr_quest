import { getBundlr } from "./get-bundlr";


export const getBalanceMatic = async () => {
	try {
		const bundlr = await getBundlr();
		const atomicBalance = await bundlr.getLoadedBalance();
		return bundlr.utils.fromAtomic(atomicBalance).toString();
	  } catch (e) {
		console.log("Error on getBalanceMatic ", e);
	  }
};
