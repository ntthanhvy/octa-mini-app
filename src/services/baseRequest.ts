export function useFetch() {
	return async (
		url: string,
		options: RequestInit = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	) => {
		var baseApi = window.__ENV__.API_BASE_URL;
		try {
			var res = await fetch(`${baseApi}${url}`, options);
			return res.json();
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
}
