import Header from 'components/Header';

import Top02 from 'components/Top/Top02';
import Stack from 'components/Stack';
import FixedBottomCTA from 'components/FixedBottomCTA';
import Slider from 'components/Slider';
import Select from 'components/Select';
import Text from 'components/Text';

import { css } from '@emotion/react';
import colors from 'constants/colors';
import { useInternalRouter } from 'pages/routing';
import { ComponentProps } from 'react';

export const LoanSetupPage = () => {
  const router = useInternalRouter();
  return (
    <>
      <Header onBackClick={() => router.goBack()} />
      <Top02>대출 내용을 설정할게요</Top02>
      <Stack>
        <Text
          typography="t4"
          css={css`
            margin-top: 20px;
          `}
        >
          얼마나 빌릴까요? 5000만원
        </Text>
        <AmountSlider
          minValue={2}
          maxValue={60}
          label={{
            min: '1000만원',
            max: '3억원',
          }}
          css={css`
            margin-top: 5px;
          `}
        />
        <Text
          typography="t6"
          color={colors.grey700}
          css={css`
            margin-top: 5px;
          `}
        >
          2억원 부터는 이자가 3.5%에요
        </Text>
        <Text
          typography="t4"
          css={css`
            margin-top: 20px;
          `}
        >
          몇개월에 걸쳐 상환할까요?
        </Text>
        <DurationSelect
          css={css`
            margin-top: 5px;
          `}
        >
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </DurationSelect>
      </Stack>
      <FixedBottomCTA onClick={() => router.push('/confirmation')}>확인</FixedBottomCTA>
    </>
  );
};

const AmountSlider = (props: ComponentProps<typeof Slider>) => <Slider {...props} data-testid="amountInput" />;
const DurationSelect = (props: ComponentProps<typeof Select>) => <Select {...props} data-testid="durationInput" />;
