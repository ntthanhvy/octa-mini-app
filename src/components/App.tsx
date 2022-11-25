import { Link, NavLink, Route, useNavigate } from "react-router-dom";
import { AnimationRoutes, App, ZMPRouter } from "zmp-ui";
import clsx from "clsx";

import {
	HomeIcon,
	CubeIcon,
	InformationCircleIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";

// Pages
import Home from "../pages";
import Cart from "../pages/cart";
import Order from "../pages/orders";
import Profile from "../pages/profile";
import Payment from "../pages/payment";
import Result from "../pages/result";
import Product from "../pages/product";
import { RecoilRoot } from "recoil";
import { OrderDetail } from "../pages/order-detail";

const menus = [
	{ name: "Home", path: "/", icon: HomeIcon },
	{ name: "Orders", path: "/orders", icon: CubeIcon },
	{ name: "Cart", path: "/cart", icon: ShoppingCartIcon },
	{ name: "Profile", path: "/profile", icon: InformationCircleIcon },
];

function MyApp() {
	return (
		<App>
			<RecoilRoot>
				<div className="h-screen bg-slate-50 text-slate-800 relative flex flex-wrap">
					<ZMPRouter>
						<div className="w-full h-full mb-16 overflow-hidden">
							<AnimationRoutes>
								<Route path="/">
									<Route path="/products/:id" element={<Product />} />
									<Route index element={<Home />} />
								</Route>
								<Route path="/cart" element={<Cart />} />
								<Route path="/orders">
									<Route path="/orders/:code" element={<OrderDetail />} />
									<Route index element={<Order />} />
								</Route>
								<Route path="/profile" element={<Profile />} />
								<Route path="/payment" element={<Payment />} />
								<Route path="/result" element={<Result />} />
							</AnimationRoutes>

							{/* <div className="h-16 w-1 invisible"></div> */}
						</div>
						<div className="fixed w-full bottom-0 inset-x-0">
							<div className="bg-white shadow-lg h-16 flex items-center justify-around">
								{menus.map(({ icon: Icon, name, path }, idx) => (
									<NavLink to={path} key={idx}>
										{({ isActive }) => (
											<span
												className={clsx(
													"text-sm flex flex-col items-center relative",
													isActive
														? "text-blue-500 font-bold"
														: "text-slate-700"
												)}
											>
												<Icon className="w-5 h-5" />
												{name}
											</span>
										)}
									</NavLink>
								))}
							</div>
						</div>
					</ZMPRouter>
				</div>
			</RecoilRoot>
		</App>
	);
}

export default MyApp;
