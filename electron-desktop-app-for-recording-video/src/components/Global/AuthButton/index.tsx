import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/clerk-react";

function AuthButton() {
	return (
		<div className="flex gap-x-3 justify-center items-center">
			<SignedOut>
				<SignInButton>
					<Button
						className="px-10 rounded-full hover:bg-gray-200"
						variant={"outline"}
					>
						Sign In
					</Button>
				</SignInButton>
				<SignUpButton>
					<Button
						className="px-10 rounded-full hover:bg-gray-200"
						variant={"outline"}
					>
						Sign Up
					</Button>
				</SignUpButton>
			</SignedOut>
		</div>
	);
}

export default AuthButton;
