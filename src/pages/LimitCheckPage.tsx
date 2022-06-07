import Header from 'components/Header';

import Top02 from 'components/Top/Top02';
import { ComponentProps, useEffect, useState, ImgHTMLAttributes } from 'react';
import FixedBottomCTA from 'components/FixedBottomCTA';
import Lottie from 'components/Lottie';
import Text from 'components/Text';

import { css } from '@emotion/react';
import { useInternalRouter } from 'pages/routing';
import Stack from 'components/Stack';

export const LimitCheckPage = () => {
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const handle = setTimeout(() => setIsPending(false), 3000);
    return () => clearTimeout(handle);
  }, []);
  const router = useInternalRouter();
  return (
    <>
      <Header onBackClick={() => router.goBack()} />
      <Top02>김토스님의 한도를 조회할게요</Top02>
      <Stack
        css={css`
          margin-top: 60px;
          align-items: center;
        `}
      >
        {isPending ? (
          <WaitingImage
            width={200}
            height={200}
            css={css`
              display: block;
            `}
          />
        ) : (
          <CompleteLottie
            loop={false}
            css={css`
              width: 200px;
              height: 200px;
            `}
          />
        )}
        <Text
          typography="t3"
          css={css`
            margin-top: 15px;
          `}
        >
          {isPending ? '대출한도를 조회하고 있어요' : '대출한도 조회가 완료됐어요!'}
        </Text>
      </Stack>
      {isPending ? undefined : <FixedBottomCTA onClick={() => router.push('/loan-setup')}>확인</FixedBottomCTA>}
    </>
  );
};

const WaitingImage = (props: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>) => (
  <img {...props} data-testid="waitingImage" src="https://static.toss.im/3d-emojis/u1F913-apng.png" />
);
const CompleteLottie = (props: Omit<ComponentProps<typeof Lottie>, 'src'>) => (
  <Lottie {...props} data-testid="completeLottie" src="https://static.toss.im/lotties/general/check.json" />
);
