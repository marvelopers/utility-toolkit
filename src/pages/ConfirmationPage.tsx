import Header from 'components/Header';

import Top02 from 'components/Top/Top02';
import List from 'components/List';
import FixedBottomCTA from 'components/FixedBottomCTA';
import Text from 'components/Text';

import { useInternalRouter } from 'pages/routing';
import { ComponentProps } from 'react';

export const ConfirmationPage = () => {
  const router = useInternalRouter();
  return (
    <>
      <Header onBackClick={() => router.goBack()} />
      <Top02>대출 내용을 확인할게요</Top02>
      <List>
        <List.Row left={<Txt>대출금액</Txt>} right={<Txt>1억원</Txt>} />
      </List>
      <FixedBottomCTA onClick={() => router.push('/complete')}>확인</FixedBottomCTA>
    </>
  );
};

const Txt = (props: Omit<ComponentProps<typeof Text>, 'typography'>) => {
  return <Text {...props} typography="t4" />;
};
