import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Box, Button, Page, Spinner } from "zmp-ui";
import { ImageView } from "../components/image-view";
import { useFetch } from "../services/baseRequest";

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
					<>
						<ImageView images={product.images} />
						<span>{product.name}</span>

						<Button variant="primary" color="green">
							Thêm giỏ hàng
						</Button>

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
					</>
				)}
			</Box>
		</Page>
	);
};
