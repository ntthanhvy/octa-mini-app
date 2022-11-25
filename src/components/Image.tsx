import clsx from "clsx";
import { useMemo } from "react";

const Image = ({
	className = "",
	size = "sm",
	src,
	alt,
}: {
	className?: string;
	size?: "sm" | "md";
	src: string;
	alt: string;
}) => {
	const { RESIZED_IMG_URL: smallImgUrl, IMG_URL: imgUrl } = window.__ENV__;

	var img = useMemo(() => {
		switch (size) {
			case "sm":
				return `${smallImgUrl}${src}`;
			case "md":
			default:
				return `${imgUrl}${src}`;
		}
	}, [size, src]);

	return (
		<div className={clsx("overflow-hidden", className)}>
			<img
				src={img}
				alt={alt}
				className="w-full h-full object-center object-cover"
			/>
		</div>
	);
};
export default Image;
