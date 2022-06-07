import styled from '@emotion/styled';
import FixedBottomCTA from './FixedBottomCTA';
import Top02 from './Top/Top02';
import Top05 from './Top/Top05';

interface Props {
  title: string;
  description: string;
  onNext: () => void;
}

export default function Welcome({ title, description, onNext }: Props) {
  return (
    <>
      <Container>
        <Top02>{title}</Top02>
        <Top05>{description}</Top05>
        <Image src="https://static.toss.im/illusts/img-persona-hand-m.png" role="presentation" alt="" />
      </Container>
      <FixedBottomCTA onClick={onNext}>다음</FixedBottomCTA>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  max-width: 320px;
  margin-top: 50px;
  align-self: center;
`;
