import { useEffect, useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { Command } from '@pipedrive/app-extensions-sdk';

import Wrapper from '../components/list/wrapper';
import Items from '../components/list/items';
import { SdkContextProvider } from '../contexts/sdk';
import useSdk from '../hooks/useSdk';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	return { id };
};

const MAX_HEIGHT = 750;
const DEFAULT_HEIGHT = 350;

const List = () => {
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
			updateHeight(DEFAULT_HEIGHT)
			return;
		}

		if (height > MAX_HEIGHT) {
			updateHeight(MAX_HEIGHT);
		} else {
			updateHeight(height);
		}
	}
	return (
		<Wrapper setHeight={setHeight}>
			<Items/>
		</Wrapper>
	);
}

export default function Container() {
	const { id: identifier } = useLoaderData();

	return (
		<SdkContextProvider id={identifier}>
			<List/>
		</SdkContextProvider>
	);
}
