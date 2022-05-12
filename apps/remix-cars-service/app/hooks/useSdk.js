import { useContext } from 'react';
import { SdkContext } from '../contexts/sdk';

export default function useSdk() {
	return useContext(SdkContext);
}
