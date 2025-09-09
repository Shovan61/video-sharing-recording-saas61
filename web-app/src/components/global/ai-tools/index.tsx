import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Play, FileText, Download, Filter, Volume2, Edit3 } from "lucide-react";
import Loader from "../loader";

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plan: any;
	trial: boolean;
	videoId: string;
};

function AiTools({ plan, trial, videoId }: Props) {
	return (
		<main className=" text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							AI Tools
						</h1>
						<p className="text-gray-400 text-xs">
							Taking your video to the next step with AI
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							className="bg-white text-black cursor-pointer hover:bg-gray-100 transition-colors"
						>
							<Loader state={false}>Try Now</Loader>
						</Button>
						<Button
							variant="outline"
							className="bg-neutral-800 text-white cursor-pointer hover:bg-neutral-900 transition-colors"
						>
							<Loader
								state={false}
								className="text-white"
							>
								{" "}
								Pay Now
							</Loader>
						</Button>
						<Button
							variant="outline"
							className="bg-white cursor-pointer text-black hover:bg-gray-100 transition-colors"
						>
							<Loader state={false}> Generate Now</Loader>
						</Button>
					</div>
				</div>

				{/* Main Tools Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					{/* Generate Video Summary */}
					<Card className=" border-gray-700 p-6 hover:bg-gray-750 transition-colors cursor-pointer">
						<div className="flex flex-col items-center text-center space-y-4">
							<div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
								<Play className="w-6 h-6 text-[#a22fe0]" />
							</div>
							<div>
								<h3 className="font-semibold mb-1 text-[#a22fe0]">
									Generate Video
								</h3>
								<p className="text-sm text-[#a22fe0]">
									Summary
								</p>
							</div>
						</div>
					</Card>

					{/* Create and read Video Transcript */}
					<Card className=" border-gray-700 p-6 hover:bg-gray-750 transition-colors cursor-pointer">
						<div className="flex flex-col items-center text-center space-y-4">
							<div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
								<FileText className="w-6 h-6 text-[#a22fe0]" />
							</div>
							<div>
								<h3 className="font-semibold mb-1 text-[#a22fe0]">
									Create and read
								</h3>
								<p className="text-sm text-[#a22fe0]">
									Video Transcript
								</p>
							</div>
						</div>
					</Card>

					{/* Download as an audio file */}
					<Card className=" border-gray-700 p-6 hover:bg-gray-750 transition-colors cursor-pointer">
						<div className="flex flex-col items-center text-center space-y-4">
							<div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
								<Download className="w-6 h-6 text-[#a22fe0]" />
							</div>
							<div>
								<h3 className="font-semibold mb-1">
									Download as
								</h3>
								<p className="text-sm text-[#a22fe0]">
									an audio file
								</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Additional Options */}
				<div className="space-y-4">
					{/* Sensor filter words */}
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
							<Filter className="w-4 h-4 text-[#a22fe0]" />
						</div>
						<span className="text-[#a22fe0]">
							Sensor filter words
						</span>
					</div>

					{/* Remove Silences */}
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
								<Volume2 className="w-4 h-4 text-[#a22fe0]" />
							</div>
							<span className="text-[#a22fe0]">
								Remove Silences
							</span>
						</div>
						<Switch />
					</div>

					{/* Create Title and Description */}
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
							<Edit3 className="w-4 h-4 text-[#a22fe0]" />
						</div>
						<span className="text-[#a22fe0]">
							Create Title and Description
						</span>
					</div>
				</div>
			</div>
		</main>
	);
}

export default AiTools;
