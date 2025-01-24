// import { camelToSnakeCase } from 'src/settings';

import { useStore } from './useStore';
import { IProduct, ISection, type IUser } from '@/interfaces/interfaces';
// import { GlobalSearchStore } from './types';

// console.log(import.meta);
// console.log(this);
// const [filenameKey] = __filename.replace('/', '').split('.');
// const STORE_KEY = `${camelToSnakeCase(filenameKey).toUpperCase()}_STORE_KEY`;
const STORE_KEY = `GENERAL_STORE_KEY`;

export const initialState = {
	token: '',
	selectedUserId: '' as string,
	users: [] as IUser[],
	selectedUser: null as IUser | null,
	sections: [] as ISection[],
	selectedProduct: null as IProduct | null,
};

export type StoreType = typeof initialState;

export function useGeneralStore(externalState?: StoreType) {
	const {
		store: generalStore,
		getStore: getGeneralStore,
		updateStore: updateGeneralStore,
	} = useStore<StoreType>(
		[STORE_KEY],
		externalState ? externalState : { ...initialState },
	);

	return { generalStore, getGeneralStore, updateGeneralStore };
}
