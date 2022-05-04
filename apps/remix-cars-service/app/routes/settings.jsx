import { useEffect, useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { Command } from '@pipedrive/custom-app-surfaces-sdk';

import useSdk from '../hooks/useSdk';
import Wrapper from '../components/list/wrapper';
import ItemsSettings from '../components/list/items-settings';
import { SdkContextProvider } from '../contexts/sdk';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	return { id };
};

const MIN_HEIGHT = 600;

const Settings = () => {
	const [height, updateHeight] = useState(0);
	const sdk = useSdk();

	useEffect(() => {
		if (!sdk || height === 0) {
			return;
		}

		sdk.execute(Command.RESIZE, { height });
	}, [sdk, height]);

	const setHeight = (height) => {
		if (!height) {
			updateHeight(MIN_HEIGHT)
			return;
		}

		if (height < MIN_HEIGHT) {
			updateHeight(MIN_HEIGHT);
		} else {
			updateHeight(height);
		}
	}
	return (
		<Wrapper setHeight={setHeight}>
			<ItemsSettings/>
		</Wrapper>
	);
}

export default function Container() {
	const { id: identifier } = useLoaderData();

	return (
		<SdkContextProvider id={identifier}>
			<Settings/>
		</SdkContextProvider>
	);
}
