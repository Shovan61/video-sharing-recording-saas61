import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
	children: React.ReactNode;
};

const AuthCallbackPage = async ({ children }: Props) => {
	const auth = await onAuthenticateUser();
	if (auth.status === 200 || auth.status === 200) {
		return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
	}

	if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
		return redirect("/auth/sign-in");
	}

	return <div>{children}</div>;
};

export default AuthCallbackPage;
