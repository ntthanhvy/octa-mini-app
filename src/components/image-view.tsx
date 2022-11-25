import { Tab } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import Image from "next/image";
import { Fragment, useState } from "react";
import Image from "./Image";
// import { imgLoader } from "utils/loader";

interface IImageView {
	images: {
		imageCode: string;
	}[];
}

export const ImageView = ({ images }: IImageView) => {
	const [selected, setSelected] = useState(0);
	const onChange = (index: number) => {
		setSelected(index);
	};

	return (
		<div className="flex flex-col-reverse">
			<Tab.Group
				as={Fragment}
				onChange={(ev) => onChange(ev)}
				selectedIndex={selected}
			>
				{/* Image selector */}
				<div className="mt-4 py-2 px-2 w-full max-w-2xl lg:max-w-none overflow-x-auto">
					<Tab.List className="inline-flex space-x-4 md:space-x-10 px-4 sm:px-0">
						{!images ? (
							<span>...Loading</span>
						) : !images ? null : (
							images.map((image, idx) => (
								<Tab
									key={idx}
									as="div"
									className={({ selected }) =>
										clsx(
											"relative h-20 md:h-24 w-20 md:w-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 overflow-hidden shadow-md",
											selected ? "ring-2 ring-offset-2 ring-blue-300" : ""
										)
									}
								>
									{/* {({ selected }) => (
										<Image
											loader={imgLoader}
											src={image.imageCode}
											alt={image.imageCode}
											layout="fill"
											objectFit="cover"
											className="rounded-md overflow-hidden"
										/>
									)} */}
									{({ selected }) => (
										<Image
											src={image.imageCode}
											alt={image.imageCode}
											className="rounded-md w-full h-full"
										/>
									)}
								</Tab>
							))
						)}
					</Tab.List>
				</div>
				<Tab.Panels className="w-full aspect-video">
					{images &&
						images.map((image, idx) => (
							<Tab.Panel
								key={idx}
								className="relative min-h-[20em] md:min-h-[25em]"
							>
								{({ selected }) => (
									<>
										<span
											className="absolute inset-y-0 left-0 w-10 z-10 flex items-center ml-2 hover:cursor-pointer"
											onClick={() => {
												if (idx - 1 < 0) onChange(images.length - 1);
												else onChange(idx - 1);
											}}
										>
											<ChevronLeftIcon className="w-10 h-10 p-1 bg-white/50 text-slate-800 rounded-full bg-blend-darken hover:bg-slate-400/50" />
										</span>
										<Image
											// loader={imgLoader}
											src={image.imageCode}
											alt={image.imageCode}
											// layout="fill"
											// objectFit="cover"
											className="sm:rounded-md overflow-hidden w-full h-full"
											size="md"
										/>
										<span
											className="absolute inset-y-0 right-0 w-10 z-10 flex items-center mr-2 hover:cursor-pointer"
											onClick={() => {
												if (idx + 1 == images.length) onChange(0);
												else onChange(idx + 1);
											}}
										>
											<ChevronRightIcon className="w-10 h-10 p-1 bg-white/50 text-slate-800 rounded-full mix-blend-screen hover:bg-slate-400/50" />
										</span>
									</>
								)}
							</Tab.Panel>
						))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};
