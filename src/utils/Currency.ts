import { MAN, UK } from 'constants/currency';

export const amountToKrw = (amount: number | string) => {
  const uk = Math.floor(Number(amount) / UK) > 0 ? `${Math.floor(Number(amount) / UK)}억` : ''; //억
  const man = Number(amount) % UK > 0 ? `${(Number(amount) % UK) / MAN}만` : ''; //만

  return `${uk} ${man}원`.trim();
};
