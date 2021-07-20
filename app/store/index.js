import { loadState } from 'services/persist.service';
import configureStore from 'configure-store';

const initialState = loadState();
export const store = configureStore(initialState);
