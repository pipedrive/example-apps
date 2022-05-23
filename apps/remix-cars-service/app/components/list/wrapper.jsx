import { useEffect, useRef, useState, useMemo } from 'react';
import { Event } from '@pipedrive/custom-app-surfaces-sdk';
import useSdk from '../../hooks/useSdk';
import useItemsLoader from '../../hooks/useItemsLoader';
import { useHighlight } from '../../hooks/useHighlight';

export default function Wrapper({ setHeight, children }) {
	const elementRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const sdk = useSdk();
	const { items, fetchItems } = useItemsLoader();
	const [updatedDate, setUpdatedDate] = useState(Date.now());

	useEffect(() => {
		if (!sdk) {
			return () => {};
		}

		const visibilityChangeUnsubscribe = sdk.listen(Event.VISIBILITY, ({ error, data }) => {
			setHeight(elementRef?.current?.clientHeight);
			setIsVisible(data.is_visible);
		});

		return () => {
			visibilityChangeUnsubscribe();
		}
	}, [sdk, elementRef]);

	useEffect(() => {
		if (!sdk) {
			return () => {};
		}

		const modalCloseUnsubscribe = sdk.listen(Event.CLOSE_CUSTOM_MODAL, ({ error, data }) => {
			setUpdatedDate(Date.now());

			return fetchItems();
		});

		return () => {
			modalCloseUnsubscribe();
		}
	}, [sdk, isVisible]);

	useEffect(() => {
		function handleResize() {
			setHeight(elementRef?.current?.clientHeight);
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize);
	}, [elementRef]);

	useEffect(() => {
		setHeight(elementRef?.current?.clientHeight);
	}, [items, elementRef?.current?.clientHeight]);

	const { isHighlighted, isFadingOut } = useHighlight({ fieldValue: updatedDate });

	const classNames = useMemo(() => {
		return Object.entries({
			['cui5-text']: true,
			['wrapper']: true,
			['highlighted']: isHighlighted,
		})
			.filter(([, state]) => state)
			.map(([className]) => className);
	}, [isHighlighted, isFadingOut]);

	return (
		<div className={classNames.join(' ')} ref={elementRef}>
			{children}
		</div>
	);
}
