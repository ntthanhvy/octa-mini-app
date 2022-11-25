const PRODUCT_LIST_URL = "/api/v1/shop/products";

const PRODUCT_URL = "/api/v1/products";

// console.log(window.__ENV__);

export const getProductList = async () => {
	var baseApi = window.__ENV__.API_BASE_URL;
	console.log({ baseApi });
	try {
		var res = await fetch(`${baseApi}${PRODUCT_LIST_URL}`);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export async function getProduct(id: number) {
	try {
		var res = await fetch(`${PRODUCT_URL}/${id}`);
		return res.json();
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}
