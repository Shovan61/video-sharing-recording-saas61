"use client";

import React, { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { changeViewFirst, getFirstView } from "@/actions/user";
import { toast } from "sonner";

function SettingsPage() {
	const [firstView, setfirstView] = useState<number>(0);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setloading(true);
			const response = await getFirstView();
			if (response.status === 200) {
				setfirstView(response.data?.firstView === true ? 1 : 0);
			} else {
				toast("Failed", {
					description: "Failed to fetch data",
					style: { color: "black", backgroundColor: "white" },
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setloading(false);
		}
	};

	const handleChckChange = async (checked: boolean) => {
		try {
			setloading(true);
			const currentview = firstView;

			setfirstView(() => {
				return checked === true ? 1 : 0;
			});

			const update = await changeViewFirst(checked);

			if (update.status === 200) {
				toast("Succes", {
					description: "Successfully updated",
					style: { color: "black", backgroundColor: "white" },
				});
			} else {
				setfirstView(currentview);
				toast("Failed", {
					description: "Failed to update",
					style: { color: "black", backgroundColor: "white" },
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setloading(false);
		}
	};

	return (
		<div className="flex flex-col px-3 py-3">
			<h2 className="text-2xl text-neutral-400 mb-6">
				Set your application settings
			</h2>
			<Separator className="w-full text-neutral-300" />
			<div className="flex flex-col mt-3">
				<p className="text-sm text-neutral-400">
					Enable or disable view first option
				</p>
				<div className="flex items-center space-x-2 mt-2">
					<Checkbox
						id="view-first"
						onCheckedChange={handleChckChange}
						value={firstView}
						disabled={loading}
					/>
					<Label htmlFor="view-first" className="text-neutral-300">
						Enable View First mode
					</Label>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
