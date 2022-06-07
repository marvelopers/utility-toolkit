import styled from '@emotion/styled';
import FixedBottomCTA from './FixedBottomCTA';
import Top02 from './Top/Top02';

interface Props {
  title: string;
  onSubmit: () => void;
}

export default function Complete({ title, onSubmit }: Props) {
  return (
    <>
      <Container>
        <Top02>{title}</Top02>
        <Image src="https://static.toss.im/illusts/img-letter-heart.png" role="presentation" alt="" />
      </Container>
      <FixedBottomCTA onClick={onSubmit}>제출하기</FixedBottomCTA>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: calc(100% - 96px);
  margin: 48px;
  margin-top: 50px;
  align-self: center;
`;
