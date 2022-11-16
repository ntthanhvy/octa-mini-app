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

const menus = [
	{ name: "Home", path: "/", icon: HomeIcon },
	{ name: "Orders", path: "/orders", icon: CubeIcon },
	{ name: "Cart", path: "/cart", icon: ShoppingCartIcon },
	{ name: "Profile", path: "/profile", icon: InformationCircleIcon },
];

function MyApp() {
	return (
		<App>
			<div className="h-screen bg-slate-50 text-slate-800 relative">
				<ZMPRouter>
					<AnimationRoutes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders" element={<Order />} />
						<Route path="/profile" element={<Profile />} />
					</AnimationRoutes>

					<div className="fixed bottom-0 inset-x-0">
						<div className="bg-white shadow-lg h-16 flex items-center justify-around">
							{menus.map(({ icon: Icon, name, path }) => (
								<NavLink to={path}>
									{({ isActive }) => (
										<span
											className={clsx(
												"text-sm flex flex-col items-center relative",
												isActive ? "text-blue-500 font-bold" : "text-slate-700"
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
		</App>
	);
}

export default MyApp;

function Navbar() {
	const navigate = useNavigate();
	return (
		<div className="fixed bottom-0 inset-x-0">
			<ul className="h-16 flex items-center justify-between">
				<li
					className="flex items-center justify-center p-3 bg-red-500"
					onClick={() => navigate("/")}
				>
					Home
				</li>
				<li
					className="flex items-center justify-center p-3"
					onClick={() => navigate("/orders")}
				>
					Home
				</li>
				<li
					className="flex items-center justify-center p-3"
					onClick={() => navigate("/cart")}
				>
					Home
				</li>
				<li
					className="flex items-center justify-center p-3"
					onClick={() => navigate("/profile")}
				>
					Home
				</li>
			</ul>
		</div>
	);
}
