import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	rows?: number;
};

function SkeletonLoader({ rows = 3 }: Props) {
	return (
		<div className="space-y-4">
			{Array.from({ length: rows }).map((_, index) => (
				<div key={index} className="flex items-center space-x-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2 w-full">
						<Skeleton className="h-4 w-[80%] bg-neutral-600" />
						<Skeleton className="h-4 w-[60%] bg-neutral-600" />
					</div>
				</div>
			))}
		</div>
	);
}

export default SkeletonLoader;
