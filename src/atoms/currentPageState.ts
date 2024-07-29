import { atom } from 'recoil';
import { Page } from '../types';

export const currentPageState = atom<Page>({
  key: 'currentPageState',
  default: { name: 'Home', link: '/' },
});
