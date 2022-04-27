import { useEffect, useRef } from 'react';
import { Event } from '@pipedrive/custom-app-surfaces-sdk';
import useSdk from '../../hooks/useSdk';
import useData from '../../hooks/useData';

export default function Wrapper({ setHeight, children }) {
	const elementRef = useRef(null);
	const sdk = useSdk();
	const { proposals, item } = useData();

	useEffect(() => {
		if (!sdk) {
			return () => {};
		}

		const visibilityChangeUnsubscribe = sdk.listen(Event.VISIBILITY, ({ error, data }) => {
			setHeight(elementRef?.current?.clientHeight);
		});

		return () => {
			visibilityChangeUnsubscribe();
		}
	}, [sdk, elementRef]);

	useEffect(() => {
		function handleResize() {
			setHeight(elementRef?.current?.clientHeight);
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize);
	}, [elementRef]);

	useEffect(() => {
		setHeight(elementRef?.current?.clientHeight);
	}, [item, proposals, elementRef?.current?.clientHeight]);

	return (
		<div className="cui5-text wrapper" ref={elementRef}>
			{children}
		</div>
	);
}
