import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Box, Button, Page, Spinner } from "zmp-ui";
import { ImageView } from "../components/image-view";
import { useFetch } from "../services/baseRequest";
import { priceFormatter } from "../utils/formatters";

export default () => {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	var fetcher = useFetch();

	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState<null | any>(null);

	const getProductDetail = async (id: number, pid: string | null) => {
		var url = `/api/v1/products/${id}`;
		if (pid) url += `/variants/${pid}`;
		const res = await fetcher(url);
		console.log({ ...res });
		if (res.code != 0) {
			console.log("Error");
			return;
		}
		setProduct(res.data);
		setLoading(false);
	};

	useEffect(() => {
		console.log({ params, searchParams });
		if (!params.id) return;

		var pid = searchParams.get("pid");
		console.log({ pid });

		setLoading(true);
		getProductDetail(+params.id, pid);
	}, [params]);

	return (
		<Page>
			<Box m={1}>
				{loading ? (
					<div className="flex items-center justify-center">
						<Spinner />
					</div>
				) : product == null ? null : (
					<div className="relative flex flex-col flex-1">
						<div className="w-full h-96 mb-10">
							<ImageView images={product.images} />
						</div>

						<div className="w-full relative px-3 mb-10">
							<h3 className="text-lg font-semibold text-slate-800">
								{product.name}
							</h3>

							<p>
								<span className=" text-red-500 font-medium text-xl items-baseline">
									{priceFormatter(product.price)} /{" "}
									<span className="italic text-base">{product.unit}</span>
								</span>
							</p>

							<p className="whitespace-pre-wrap mt-5">{product.description}</p>
						</div>

						<div className="flex items-center justify-between px-3 mt-auto">
							<Button type="neutral">Thêm giỏ hàng</Button>
							<Button type="danger">
								<Link
									to={{
										pathname: "/payment",
									}}
									state={{
										productId: product.productId,
										masterId: product.masterId,
										shopId: product.shopId,
										name: product.name,
										price: product.price,
										imageCode: product.imageCode,
										unit: product.unit,
										sku: product.sku,
										amount: 1,
									}}
								>
									Mua ngay
								</Link>
							</Button>
						</div>
					</div>
				)}
			</Box>
		</Page>
	);
};
