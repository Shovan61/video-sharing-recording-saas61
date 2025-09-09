import { updateToPro } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function PaymentButton() {
	const [isLoading, setisLoading] = useState(false);

	const update = async () => {
		try {
			setisLoading(true);
			const data = await updateToPro();

			if (data.status === 200) {
				toast.success("Success");
			} else {
				toast.error("Failed");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setisLoading(false);
		}
	};

	return (
		<Button
			className="text-sm w-full cursor-pointer"
			variant={"outline"}
			disabled={isLoading}
			onClick={update}
		>
			{isLoading && <Loader className="animate-spin" />}
			Upgrade
		</Button>
	);
}

export default PaymentButton;
