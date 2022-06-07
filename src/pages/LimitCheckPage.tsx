import Header from 'components/Header';

import Top02 from 'components/Top/Top02';
import { ComponentProps, useEffect, useState, ImgHTMLAttributes } from 'react';
import FixedBottomCTA from 'components/FixedBottomCTA';
import Lottie from 'components/Lottie';
import Text from 'components/Text';

import { css } from '@emotion/react';
import { useInternalRouter } from 'pages/routing';
import Stack from 'components/Stack';
import useGetMe from 'hooks/useGetMe';
import useGetLoanLimit from 'hooks/useGetLoanLimit';

// ? 무조건 8초 이상이 소요되는 화면인지 확인 필요

const STEP = {
  Start: 'start',
  Progress: 'progress',
  AlmostDone: 'almostDone',
  Done: 'done',
} as const;

const LIMIT_CHECK_PENDING_MESSAGE = {
  [STEP.Start]: '대출한도를 조회하고 있어요',
  [STEP.Progress]: '약 7분 정도 걸릴 수 있어요',
  [STEP.AlmostDone]: '대출한도 조회가 거의 끝나가요!',
  [STEP.Done]: '대출한도 조회가 완료됐어요!',
};

export const LimitCheckPage = () => {
  const router = useInternalRouter();
  const [step, setStep] = useState<typeof STEP[keyof typeof STEP]>(STEP.Start);
  const isDone = step === STEP.Done;

  const me = useGetMe();
  const hasFinished = useGetLoanLimit();

  useEffect(() => {
    if (!hasFinished) {
      const handle = setTimeout(() => {
        setStep(STEP.Progress);
      }, 3000);

      return () => clearTimeout(handle);
    }
  }, []);

  useEffect(() => {
    if (hasFinished) {
      setStep(STEP.AlmostDone);
      const handle = setTimeout(() => {
        setStep(STEP.Done);
      }, 2000);
      return () => clearTimeout(handle);
    }
  }, [hasFinished]);

  return (
    <>
      <Header onBackClick={() => router.goBack()} />
      <Top02>{me?.name}님의 한도를 조회할게요</Top02>
      <Stack
        css={css`
          margin-top: 60px;
          align-items: center;
        `}
      >
        {isDone ? (
          <CompleteLottie
            loop={false}
            css={css`
              width: 200px;
              height: 200px;
            `}
          />
        ) : (
          <WaitingImage
            width={200}
            height={200}
            css={css`
              display: block;
            `}
          />
        )}
        <Text
          typography="t3"
          css={css`
            margin-top: 15px;
          `}
        >
          {LIMIT_CHECK_PENDING_MESSAGE[step]}
        </Text>
      </Stack>
      {isDone && <FixedBottomCTA onClick={() => router.push('/loan-setup')}>확인</FixedBottomCTA>}
    </>
  );
};

const WaitingImage = (props: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>) => (
  <img {...props} data-testid="waitingImage" src="https://static.toss.im/3d-emojis/u1F913-apng.png" />
);
const CompleteLottie = (props: Omit<ComponentProps<typeof Lottie>, 'src'>) => (
  <Lottie {...props} data-testid="completeLottie" src="https://static.toss.im/lotties/general/check.json" />
);
