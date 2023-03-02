import { disassembleKorean } './disassembleKorean';

describe(disassembleKorean.name, () => {
  test('칼', () => {
    expect(disassembleKorean('한')).toEqual({
      cho: 'ㅎ',
      jung: 'ㅏ',
      jong: 'ㄴ',
    });
  });
  test('가', () => {
    expect(disassembleKorean('글')).toEqual({
      cho: 'ㄱ',
      jung: 'ㅡ',
      jong: 'ㄹ',
    });
  });
  test('웹', () => {
    expect(disassembleKorean('웹')).toEqual({
      cho: 'ㅇ',
      jung: 'ㅜㅔ',
      jong: 'ㅂ',
    });
  });
});
