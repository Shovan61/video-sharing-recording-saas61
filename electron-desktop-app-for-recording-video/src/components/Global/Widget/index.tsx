import MideaConfiguration from "@/components/MideaConfiguration";
import { fetchUserProfile } from "@/lib/utils";
import { Profile } from "@/type";
import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

function Widget() {
	const [profile, setprofile] = useState<Profile | null>(null);
	const { user } = useUser();

	useEffect(() => {
		if (user && user.id) {
			fetchUserProfile(user.id).then((p) => {
				setprofile(p.data);
			});
		}
	}, [user]);

	console.log(profile, "profile");

	return (
		<div className="p-5">
			<ClerkLoading>
				<div className="h-full flex items-center justify-center">
					<Loader className="animate-spin" />
				</div>
			</ClerkLoading>
			<SignedIn>
				{profile ? (
					<MideaConfiguration />
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<Loader className="animate-spin" />
					</div>
				)}
			</SignedIn>
		</div>
	);
}

export default Widget;
