import { useEffect, useRef, useState } from 'react';

const HIGHLIGHT_TIMER = 1500;

export function useHighlight(value) {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const valueRef = useRef(value);
	const highlightTimer = useRef(null);

	if (valueRef.current !== value) {
		valueRef.current = value;
	}

	useEffect(() => {
		setIsHighlighted(true);

		highlightTimer.current = setTimeout(() => {
			setIsHighlighted(false);
		}, HIGHLIGHT_TIMER);

		return () => {
			clearTimeout(highlightTimer.current);
		};
	}, [valueRef.current]);

	return { isHighlighted };
}
