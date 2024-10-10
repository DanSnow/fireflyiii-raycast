import { atomWithLazy } from 'jotai/utils';
import { createClient } from '../utils/client';

export const clientAtom = atomWithLazy(() => createClient());
