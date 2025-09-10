import { Profile } from "@/type";
import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useState } from "react";

function Widget() {
	const [profile, setprofile] = useState<Profile | null>(null);
	const { user } = useUser();

	return (
		<div className="p-5">
			<ClerkLoading>
				<div className="h-full flex items-center justify-center">
					<Loader className="animate-spin" />
				</div>
			</ClerkLoading>
			<SignedIn>{}</SignedIn>
		</div>
	);
}

export default Widget;
