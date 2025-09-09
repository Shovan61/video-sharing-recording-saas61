import React from "react";

type Props = {
	transcript: string | null;
};

function Transcript({ transcript }: Props) {
	return (
		<main className="min-h-[40vh] text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			<p className="text-white">{transcript}</p>
		</main>
	);
}

export default Transcript;
