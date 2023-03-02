import { isJongSungL, hasJongSung } from './utils';

type JosaOption = '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '이나/나' | '이에/에';

export const josaPicker = (word: string, josa: JosaOption) => {
  let josaIndex = hasJongSung(word) ? 0 : 1;

  if (josa === '와/과' || (isJongSungL(word) && josa === '으로/로')) {
    josaIndex = josaIndex === 0 ? 1 : 0;
  }

  return josa.split('/')[josaIndex]!;
};

export const withJosa = (word: string, josa: JosaOption) => `${word}${josaPicker(word, josa)}`;
