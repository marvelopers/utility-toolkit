import Header from 'components/Header';

import Top02 from 'components/Top/Top02';
import List from 'components/List';
import FixedBottomCTA from 'components/FixedBottomCTA';
import Text from 'components/Text';

import { useInternalRouter } from 'pages/routing';
import { ComponentProps, useEffect, useState } from 'react';
import { LocalStorage, LocalStorageKey } from 'utils/Storage';
import { amountToKrw } from 'utils/Currency';

type LoanInfo = {
  amount: number;
  month: number;
};

export const ConfirmationPage = () => {
  const router = useInternalRouter();
  const [loanInfo, setLoanInfo] = useState<LoanInfo | null>(null);

  useEffect(() => {
    const loanInfo = LocalStorage.getValue(LocalStorageKey.LoanInfo);
    if (!loanInfo) {
      throw new Error('대출 정보가 없습니다');
    }

    try {
      const info = JSON.parse(loanInfo);

      if (!info.amount || !info.month) {
        LocalStorage.removeItem(LocalStorageKey.LoanInfo);
        throw new Error('대출 정보가 없습니다');
      }

      setLoanInfo(info);
    } catch (error) {
      // 대출 정보 없는 경우 에러 처리 필요
    }
  });

  return (
    <>
      <Header onBackClick={() => router.goBack()} />
      <Top02>대출 내용을 확인할게요</Top02>
      <List>
        <List.Row left={<Txt>대출금액</Txt>} right={<Txt>{amountToKrw(loanInfo?.amount || 0)}</Txt>} />
        <List.Row left={<Txt>상환기간</Txt>} right={<Txt>{loanInfo?.month}개월</Txt>} />
      </List>
      <FixedBottomCTA onClick={() => router.push('/complete')}>확인</FixedBottomCTA>
    </>
  );
};

const Txt = (props: Omit<ComponentProps<typeof Text>, 'typography'>) => {
  return <Text {...props} typography="t4" />;
};
