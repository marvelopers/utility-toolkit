import {
  CHO_SUNG,
  COUNTED_JONG_SUNG,
  COUNTED_JUNG_SUNG,
  JONG_SUNG,
  JUNG_SUNG,
  KOREAN_START_CHARCODE,
} from './constants';
import { isKorean } from './utils';

export const disassembleKorean = (letter: string) => {
  if (!isKorean(letter)) return undefined;

  const charCode = letter.charCodeAt(0) - KOREAN_START_CHARCODE;

  const lastIndex = charCode % COUNTED_JONG_SUNG;
  const middleIndex = ((charCode - lastIndex) / COUNTED_JONG_SUNG) % COUNTED_JUNG_SUNG;
  const firstIndex = ((charCode - lastIndex) / COUNTED_JONG_SUNG - middleIndex) / COUNTED_JUNG_SUNG;

  return { chosung: CHO_SUNG[firstIndex], jungsung: JUNG_SUNG[middleIndex], jongsung: JONG_SUNG[lastIndex] };
};
