import { useEffect, useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { Command } from '@pipedrive/custom-app-surfaces-sdk';

import Wrapper from '../components/details/wrapper';
import Item from '../components/details/item';
import Proposals from '../components/details/proposals';
import { SdkContextProvider } from '../contexts/sdk';
import useSdk from '../hooks/useSdk';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	return { id };
};

const MAX_HEIGHT = 750;
const DEFAULT_HEIGHT = 350;
const DEFAULT_WIDTH = 496;

const Details = () => {
	const [height, updateHeight] = useState(0);
	const sdk = useSdk();

	useEffect(() => {
		if (!sdk || height === 0) {
			return;
		}

		sdk.execute(Command.RESIZE, { width: DEFAULT_WIDTH, height });
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
			<Item/>

			<Proposals/>
		</Wrapper>
	);
}

export default function Container() {
	const { id: identifier } = useLoaderData();

	return (
		<SdkContextProvider id={identifier}>
			<Details/>
		</SdkContextProvider>
	);
}
