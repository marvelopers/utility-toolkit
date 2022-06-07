import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';

interface Props {
  className?: string;
}

const Stack = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={className}
      css={css`
        padding: 0 24px;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
};

export default Stack;
