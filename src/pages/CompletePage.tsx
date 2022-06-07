import Top02 from 'components/Top/Top02';
import FixedBottomCTA from 'components/FixedBottomCTA';

import { css } from '@emotion/react';
import { useInternalRouter } from 'pages/routing';

export const CompletePage = () => {
  const router = useInternalRouter();
  return (
    <>
      <Top02>대출이 완료됐어요!</Top02>
      <img
        src="https://static.toss.im/3d-emojis/u1F389_apng.png"
        width={200}
        height={200}
        css={css`
          display: block;
          margin: 60px auto;
        `}
      />
      <FixedBottomCTA onClick={() => router.push('/rrn-check')}>확인</FixedBottomCTA>
    </>
  );
};
