import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api, { Payment, Events } from "zmp-sdk";

const RedirectPath = "/result";

export default () => {
	// api.events.on(Events.OpenApp, (data) => {
	// 	const params = data?.path;
	// 	console.log({ params });

	// 	// kiểm tra path trả về từ giao dịch thanh toán
	// 	// RedirectPath: đã cung cấp tại trang tích hợp thanh toán

	// 	if (params.includes(RedirectPath)) {
	// 		// gọi api checkTransaction để lấy thông tin giao dịch
	// 		Payment.checkTransaction({
	// 			data: params,
	// 			success: (rs) => {
	// 				// Kết quả giao dịch khi gọi api thành công
	// 				const { id, resultCode, msg, transTime, createdAt } = rs;
	// 			},
	// 			fail: (err) => {
	// 				// Kết quả giao dịch khi gọi api thất bại
	// 				console.log(err);
	// 			},
	// 		});
	// 	}
	// });

	const [params] = useSearchParams();

	useEffect(() => {
    
		console.log(params.toString());
		// gọi api checkTransaction để lấy thông tin giao dịch
		Payment.checkTransaction({
			data: params.toString() ?? "",
			success: (rs) => {
				// Kết quả giao dịch khi gọi api thành công
				const { id, resultCode, msg, transTime, createdAt } = rs;
			},
			fail: (err) => {
				// Kết quả giao dịch khi gọi api thất bại
				console.log(err);
			},
		});
	}, []);

	return <div>result</div>;
};
