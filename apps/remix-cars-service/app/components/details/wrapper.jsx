import { useEffect, useRef } from 'react';
import useData from '../../hooks/useData';

export default function Wrapper({ setHeight, children }) {
	const elementRef = useRef(null);
	const { proposals, item } = useData();

	useEffect(() => {
		setHeight(elementRef?.current?.clientHeight);
	}, [item, proposals, elementRef?.current?.clientHeight]);

	return (
		<div className="cui5-text wrapper" ref={elementRef}>
			{children}
		</div>
	);
}
