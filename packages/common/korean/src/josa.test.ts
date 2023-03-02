import { josaPicker, withJosa } from './josa';

describe(josaPicker.name, () => {
  test('받침이 있는 경우 조사: 이/가', () => {
    expect(josaPicker('한글', '이/가')).toBe('이');
  });
  test('받침이 없는 경우 조사: 이/가', () => {
    expect(josaPicker('리액트', '이/가')).toBe('가');
  });
  test('ㄹ 받침이 있는 경우 조사: 으로/로', () => {
    expect(josaPicker('한글', '으로/로')).toBe('로');
  });
  test('받침이 있는 경우 조사: 으로/로', () => {
    expect(josaPicker('한국', '으로/로')).toBe('으로');
  });
  test('받침이 있는 경우 조사: 으로/로', () => {
    expect(josaPicker('리액트', '으로/로')).toBe('로');
  });
  test('받침이 있는 경우 조사: 와/과', () => {
    expect(josaPicker('웹', '와/과')).toBe('과');
  });
  test('받침이 있는 경우 조사:  와/과', () => {
    expect(josaPicker('리액트', '와/과')).toBe('와');
  });
  test('받침이 있는 경우 조사: 이나/나', () => {
    expect(josaPicker('웹', '이나/나')).toBe('이나');
  });
  test('받침이 있는 경우 조사: 이나/나', () => {
    expect(josaPicker('리액트', '이나/나')).toBe('나');
  });
});

describe(withJosa.name, () => {
  test('받침이 있는 경우 조사: 이/가', () => {
    expect(withJosa('웹', '이/가')).toBe('웹이');
  });
  test('받침이 없는 경우 조사: 이/가', () => {
    expect(withJosa('리액트', '이/가')).toBe('리액트가');
  });
  test('받침이 있는 경우 조사: 으로/로', () => {
    expect(withJosa('웹', '으로/로')).toBe('웹으로');
  });
  test('받침이 있는 경우 조사: 으로/로', () => {
    expect(withJosa('리액트', '으로/로')).toBe('리액트로');
  });
});
