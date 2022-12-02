import { MapIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api, { Payment } from "zmp-sdk";
import { Button } from "zmp-ui";

import Image from "../components/Image";
import { useFetch } from "../services/baseRequest";
import { priceFormatter } from "../utils/formatters";

export default () => {
	const [deviceId, setDeviceId] = useState<string | null>(null);
	async function login() {
		try {
			await api.login({}).catch((err) => console.log(err));
			var deviceId = api.getDeviceId();
			setDeviceId(deviceId);
		} catch (err) {
			console.log(err);
		}
	}

	const location = useLocation();
	const navigate = useNavigate();
	var state = location.state || {};

	useEffect(() => {
		login();
	}, []);

	const shippingInfo = {
		name: "Thanh vy",
		phoneNumber: "0909121212",
		address: "123 Nguyen Van Linh",
	};

	const fetcher = useFetch();

	const onOrder = async () => {
		try {
			var order = {
				items: [
					{
						...state,
						productName: state.name,
						productImageCode: state.imageCode,
					},
				],
				shippingInfo,
				note: "",
				shopId: state.shopId,
			};

			// if (!deviceId) {
			// 	api.showToast({
			// 		message: "unauthorized",
			// 	});
			// 	return;
			// }
			console.log({ deviceId, order });

			var baseAPI = window.__ENV__.API_BASE_URL;
			var url = baseAPI + "/api/v1/checkout";
			var headers = {
				// "Content-Type": "application/x-www-form-urlencoded",
				"Content-Type": "application/json",
				"X-Device-Code": deviceId ?? "",
			};

			console.log({ url, headers, body: JSON.stringify(order) });
			var res = await fetch(url, {
				method: "POST",
				headers,
				body: JSON.stringify(order),
			});
			var resOrder = await res.json();

			console.log({ resOrder });
			var { code: orderCode, grandTotal } = resOrder.data;

			var { orderId } = await Payment.createOrder({
				desc: `Thanh toan don hang ${orderCode}`,
				amount: grandTotal,
				item: [{ orderCode, grandTotal }],
				fail: (err) => {
					console.log(err);
					throw err;
				},
				// method: "ZALOPAY_SANDBOX",
			});
			console.log({ orderId });

			navigate(`/orders/${resOrder.data.code}`, {
				state: { orderId },
				replace: true,
			});
		} catch (err: any) {
			console.log({ ...err });
		}
	};

	return (
		<div>
			{state ? (
				<>
					<div className="flex">
						<Image
							src={state?.imageCode}
							alt={state?.name}
							className="w-18 h-18 max-h-18 rounded-md shadow-md"
						/>{" "}
						<div>
							<p className="font-medium">{state.name}</p>
							<p>{priceFormatter(state.price)}</p>
							<p>
								{state.amount} / {state.unit}
							</p>
						</div>
					</div>
					<div className="card">
						<h3 className="font-medium text-lg">Thông tin giao hàng </h3>

						<div>
							<div className="flex items-center">
								<UserIcon className="w-5 h-5 mr-3" />
								<span>{shippingInfo.name}</span>
							</div>
							<div className="flex items-center">
								<PhoneIcon className="w-5 h-5 mr-3" />
								<span>{shippingInfo.phoneNumber}</span>
							</div>
							<div className="flex items-center">
								<MapIcon className="w-5 h-5 mr-3" />
								<span>{shippingInfo.address}</span>
							</div>
						</div>
					</div>
					<Button onClick={onOrder}>Đặt hàng</Button>
				</>
			) : null}
		</div>
	);
};
