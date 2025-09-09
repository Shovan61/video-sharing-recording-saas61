import { useState, useEffect } from "react";
import { useQueryData } from "./useQueryData";
import { searchUsers } from "@/actions/user";

type UserData = {
	id: string;
	subscriptions: {
		plan: "PRO" | "FREE";
	};
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	image: string | null;
};

export const useSearch = (key: string, type: "USER") => {
	const [onUsers, setonUsers] = useState<UserData[] | undefined>(undefined);
	const [query, setquery] = useState<string>("");
	const [debounce, setdebounce] = useState<string>("");

	const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		setquery(e.target.value);
	};

	useEffect(() => {
		const delayInputTimeoutId = setTimeout(() => {
			setdebounce(query);
		}, 1000);

		return () => {
			clearTimeout(delayInputTimeoutId);
		};
	}, [query]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fetchData = async (data: any) => {
		try {
			if (type === "USER") {
				const users = await searchUsers(data.queryKey[1] as string);

				if (users.status === 200 && users.data) {
					const normalizedUsers: UserData[] = users.data.map(
						(user) => ({
							id: user.id,
							firstName: user.firstName ?? null,
							lastName: user.lastName ?? null,
							email: user.email ?? null,
							image: user.image ?? null,
							subscriptions: {
								plan: (user.subscriptions?.plan ===
								"PRO"
									? "PRO"
									: "FREE") as "PRO" | "FREE",
							},
						})
					);

					setonUsers(normalizedUsers);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { refetch, isFetching } = useQueryData([key, debounce], fetchData, false);

	useEffect(() => {
		if (debounce) refetch();
		if (!debounce) setonUsers(undefined);

		return () => {
			// cleanup logic if needed
		};
	}, [debounce, refetch]);

	return { isFetching, onUsers, onSearchQuery, query };
};
