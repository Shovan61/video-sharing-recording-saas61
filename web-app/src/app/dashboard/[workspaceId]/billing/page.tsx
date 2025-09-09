import { getBilingInformation } from "@/actions/user";
import React from "react";

async function BillingPage() {
	const billingInfo = await getBilingInformation();
	return (
		<div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
			<div>
				<h2 className="text-2xl">Current Plan</h2>
				<p className="text-[#9D9D9D]">Your payment history</p>
			</div>
			<div>
				<h2 className="text-2xl">
					{billingInfo.data?.subscriptions?.plan === "PRO"
						? "99"
						: "0"}
					/Month
				</h2>
				<p className="text-[#9D9D9D]">
					{billingInfo.data?.subscriptions?.plan}
				</p>
			</div>
		</div>
	);
}

export default BillingPage;
