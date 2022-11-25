import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "zmp-ui";

const items = [
	{
		name: "Sp1",
		amount: 1,
		price: 20000,
	},
	{
		name: "Sp2",
		amount: 1,
		price: 30000,
	},
];

export default () => {
	const navigate = useNavigate();

	return (
		<Page className="p-5">
			<div className="bg-white rounded-lg">
				<div className="px-3 py-4">
					<h3 className="font-medium text-lg">Cart</h3>
				</div>

				<div className="px-3 py-4 divide-y divide-slate-300">
					{items.map((item) => (
						<div
							key={item.name}
							className="flex items-start justify-around py-3"
						>
							<span>{item.name}</span>
							<span>{item.price.toLocaleString("vi-VN")}</span>
							<span>x {item.amount}</span>
						</div>
					))}
				</div>

				<div className="px-3 py-4">
					<button
						className="px-3 py-3 rounded-md bg-blue-500 text-white font-medium w-full uppercase"
						onClick={() => navigate("/payment", { state: { items } })}
					>
						Thanh toan
					</button>
				</div>
			</div>
		</Page>
	);
};
