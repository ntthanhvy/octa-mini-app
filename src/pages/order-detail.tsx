import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Page } from "zmp-ui";
import { useFetch } from "../services/baseRequest";

import api, { Payment } from "zmp-sdk";

export const OrderDetail = () => {
	const params = useParams<{ code: string }>();

	var code = params.code;

	const location = useLocation();
	const state = location.state || {};

	const fetcher = useFetch();
	const [order, setOrder] = useState<null | any>(null);

	var getOrderDetail = async (code: string) => {
		var deviceId = api.getDeviceId();
		var res = await fetcher(`/api/v1/orders/${code}`, {
			headers: {
				"X-Device-Code": deviceId,
			},
		});
		console.log({ res });

		setOrder(res.data);
	};

	useEffect(() => {
		if (!code) return;

		getOrderDetail(code);
	}, [code]);

	useEffect(() => {
		if (!state) return;

		Payment.checkTransaction({
			data: { orderId: state.orderId },
			success: (res) => {
				console.log({ res });
			},
			fail: (err) => {
				console.log(err);
			},
		});
	}, [state]);

	return (
		<div className="p-4">
			OrderDetail of : {code}
			<pre>{JSON.stringify(order, null, 2)}</pre>
		</div>
	);
};
