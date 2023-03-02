import { disassembleKorean } from './disassembleKorean';
import { KOREAN_END_CHARCODE, KOREAN_START_CHARCODE } from './constants';

export const isKorean = (str: string) =>
  !(str.charCodeAt(0) < KOREAN_START_CHARCODE || str.charCodeAt(0) > KOREAN_END_CHARCODE);

export const getLastLetter = (str: string) => str.slice(-1);

export const hasJongSung = (str: string) => !!disassembleKorean(getLastLetter(str))?.jongsung;

export const isJongSungL = (str: string) => {
  const jongSong = disassembleKorean(getLastLetter(str))?.jongsung;
  return !!jongSong && jongSong === 'ㄹ';
};
export const getChoSung = (word: string) =>
  word.split('').reduce((prev, letter) => `${prev}${disassembleKorean(letter)?.chosung}`, '');
