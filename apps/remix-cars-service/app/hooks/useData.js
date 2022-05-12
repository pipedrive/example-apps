import { useContext } from 'react';
import { DataContext } from '../contexts/data';

export default function useData() {
	return useContext(DataContext);
}
