import { useReducer } from "react";
import { DisplayDevicesActionProps, SourceDevices } from "../type/index";
import { getMediaSources } from "@/lib/utils";

export const useMediaResources = () => {
	const [state, action] = useReducer(
		(state: SourceDevices, action: DisplayDevicesActionProps) => {
			switch (action.type) {
				case "GET_DEVICES":
					return { ...state, ...action.payload };
				default:
					return state;
			}
		},
		{
			displays: [],
			audioInputs: [],
			error: null,
			isPending: false,
		}
	);

	const fetchMediaResources = () => {
		action({ type: "GET_DEVICES", payload: { isPending: true } });
		getMediaSources().then((sources) =>
			action({
				type: "GET_DEVICES",
				payload: {
					displays: sources?.displays,
					audioInputs: sources?.audioInputs,
					isPending: false,
				},
			})
		);
	};

	return { state, fetchMediaResources };
};
