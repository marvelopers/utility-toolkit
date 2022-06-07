import { MemoryRouter } from 'react-router-dom';
import { waitFor, fireEvent, render, screen } from '@testing-library/react';

import App from './App';

test('API 연동 없이 통과해야해요', async () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(screen.getByText(/대출을 신청할게요/)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('cta'));

  expect(screen.queryByTestId('cta')).toBeNull();
  expect(screen.getByText(/.+님의 한도를 조회할게요/)).toBeInTheDocument();
  await waitFor(
    () => {
      expect(screen.getByText(/조회가 완료됐어요/)).toBeInTheDocument();
    },
    { timeout: 9000 }
  );
  expect(screen.getByTestId('cta')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('cta'));

  expect(screen.getByText(/얼마나 빌릴까요\?/)).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('amountInput'), { target: { value: 23 } });
  expect(screen.getByText(/몇개월에 걸쳐 상환할까요\?/)).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('durationInput'), { target: { value: 20 } });
  fireEvent.click(screen.getByTestId('cta'));

  expect(screen.getByText(/대출 내용을 확인할게요/)).toBeInTheDocument();
  expect(screen.getByText(/1억1500만원/)).toBeInTheDocument();
  expect(screen.getByText(/20개월/)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('cta'));

  expect(screen.getByText(/대출이 완료됐어요!/)).toBeInTheDocument();
});
test.skip('API 연동 후 검증을 위한 테스트는 제공되지 않습니다', () => {});
