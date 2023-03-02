import { isKorean, getChoSung, hasJongSung, isJongSungL } "./utils"
describe(isKorean.name, () => {
  test('글자가 한글인지 확인한다', () => {
    expect(isKorean('가')).toMatchInlineSnapshot('true');
    expect(isKorean('GA')).toMatchInlineSnapshot('false');
  });
});

describe(getChoSung.name, () => {
  test('프론트엔드', () => {
    expect(getChoSung('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
});

describe(hasJongSung.name, () => {
  test('웹', () => {
    expect(hasJongSung('웹')).toBe(true);
  });
  test('리액트', () => {
    expect(hasJongSung('리액트')).toBe(false);
  });
});

describe(isJongSungL.name, () => {
  test('한글', () => {
    expect(isJongSungL('한글')).toBe(true);
  });
  test('리액트', () => {
    expect(isJongSungL('리액트')).toBe(false);
  });
});
