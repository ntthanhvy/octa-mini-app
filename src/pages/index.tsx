import { useEffect, useState } from "react";
import { Box, Button, List, Page, Spinner } from "zmp-ui";
import api from "zmp-sdk";
import { Link, useNavigate } from "react-router-dom";
import { getProductList } from "../services/productApi";
import { useFetch } from "../services/baseRequest";
import { priceFormatter } from "../utils/formatters";
import { selector, useRecoilValue } from "recoil";
import Image from "../components/Image";

const productQuery = selector({
	key: "products",
	get: async () => {
		const { API_BASE_URL: baseAPI } = window.__ENV__;
		const response = await fetch(`${baseAPI}/api/v1/shop/products`);
		return response.json();
	},
});

export default () => {
	var fetcher = useFetch();
	const queryResults = useRecoilValue(productQuery);

	const [loading, setLoading] = useState(false);
	// const getAppInfo = async () => {
	// 	const res = await fetcher("/api/v1/shop/products");
	// 	console.log({ ...res });
	// 	if (res.code != 0) {
	// 		console.log("Error");
	// 		return;
	// 	}
	// 	setProducts(res.data);
	// 	setLoading(false);
	// };

	const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	setLoading(true);
	// 	getAppInfo();
	// }, []);

	const navigate = useNavigate();

	var { RESIZED_IMG_URL: smallImgUrl } = window.__ENV__;

	useEffect(() => {
		if (!queryResults) return;

		setProducts(queryResults.data);
	}, [queryResults]);

	return loading ? (
		<div className="flex items-center justify-center">
			<Spinner />
		</div>
	) : (
		<div className="px-3 py-4 pr-0 overflow-y-auto">
			<div className="flex flex-wrap items-center">
				{products.map((product: any) => (
					<div
						key={product.productId}
						className="w-6/12 lg:w-28 flex items-start justify-start"
					>
						<Link to={`/products/${product.masterId}?pid=${product.productId}`}>
							<div className="relative hover:cursor-pointer truncate w-18 lg:w-28 mb-4 mr-4">
								<div className="relative w-full aspect-[3/4] lg:w-28 lg:h-36 rounded-lg overflow-hidden shadow-md">
									{/* <Image
													loader={imgLoader}
													src={product.imageCode}
													alt={product.name}
													layout="fill"
													objectFit="cover"
													className="w-full h-full object-center object-cover"
												/> */}
									<Image
										src={product.imageCode}
										alt={product.imageCode}
										className="w-full h-full"
									/>
								</div>
								{/* <div className="relative mt-2 lg:mt-4 w-full truncate text-ellipsis ">
											<h3 className="font-medium text-sm text-slate-800 truncate">
												{product.name}
											</h3>
										</div> */}
								<div className="relative w-full mt-3 truncate max-w-full">
									<p className="font-medium truncate text-ellipsis max-w-full">
										{product.name}
									</p>
								</div>
								<div className="absolute top-0 inset-x-0 w-full aspect-[3/4] lg:w-28 lg:h-36 rounded-lg p-2 flex items-end justify-end overflow-hidden bg-gradient-to-t from-slate-900/75">
									<p className="relative text-sm lg:text-base font-semibold text-white whitespace-nowrap">
										{priceFormatter(product.price)}
									</p>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
