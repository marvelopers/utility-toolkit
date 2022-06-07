import Top02 from 'components/Top/Top02';
import FixedBottomCTA from 'components/FixedBottomCTA';

import { css } from '@emotion/react';
import { useInternalRouter } from './routing';

export const StartPage = () => {
  const { push } = useInternalRouter();
  return (
    <>
      <Top02>대출을 신청할게요</Top02>
      <img
        src="https://static.toss.im/3d/money-wings-confetti-apng.png"
        width={300}
        height={300}
        css={css`
          display: block;
          margin: 60px auto;
        `}
      />
      <FixedBottomCTA onClick={() => push('/limit-check')}>다음</FixedBottomCTA>
    </>
  );
};
