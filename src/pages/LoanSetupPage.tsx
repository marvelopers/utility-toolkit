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
import { ComponentProps, useEffect, useState } from 'react';
import { LocalStorage, LocalStorageKey } from 'utils/Storage';
import { amountToKrw } from 'utils/Currency';
import useGetLoanInterest from 'hooks/useGetLoanInterest';
import useDebounce from 'hooks/useDebounce';

// ? 최소 선택 단위 100으로 임의 설정, 기획 확인 필요

export const LoanSetupPage = () => {
  const router = useInternalRouter();
  const [loanAmount, setLoanAmount] = useState(50000000);
  const [repaymentMonths, setRepaymentMonths] = useState(30);

  const debouncedLoanAmount = useDebounce(loanAmount, 200) as number;
  const { isLoading, baseAmount, interestRate } = useGetLoanInterest(debouncedLoanAmount);

  const handleAmountChange = (amount: number) => {
    setLoanAmount(amount);
    LocalStorage.setValue(
      LocalStorageKey.LoanInfo,
      JSON.stringify({
        amount,
        month: repaymentMonths,
      })
    );
  };

  const handleRepaymentMonths = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRepaymentMonths(Number(e.target.value));
    LocalStorage.setValue(
      LocalStorageKey.LoanInfo,
      JSON.stringify({
        amount: loanAmount,
        month: e.target.value,
      })
    );
  };

  useEffect(() => {
    const loanInfo = LocalStorage.getValue(LocalStorageKey.LoanInfo);
    if (!loanInfo) {
      LocalStorage.setValue(
        LocalStorageKey.LoanInfo,
        JSON.stringify({
          amount: 5000,
          month: 30,
        })
      );
      return;
    }

    try {
      const info = JSON.parse(loanInfo);

      if (!info.amount || !info.month) {
        LocalStorage.removeItem(LocalStorageKey.LoanInfo);
        return;
      }

      if (info.amount) {
        setLoanAmount(Number(info.amount));
      }
      if (info.month) {
        setRepaymentMonths(Number(info.month));
      }
    } catch (error) {
      // do thing
    }
  });

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
          얼마나 빌릴까요? {amountToKrw(loanAmount)}
        </Text>
        <AmountSlider
          value={loanAmount}
          onChange={handleAmountChange}
          step={1000000}
          minValue={10000000}
          maxValue={300000000}
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
          {isLoading ? '...' : `${amountToKrw(Number(baseAmount))}부터는 이자가 ${Number(interestRate / 10)}%에요`}
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
          value={repaymentMonths}
          onChange={handleRepaymentMonths}
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
