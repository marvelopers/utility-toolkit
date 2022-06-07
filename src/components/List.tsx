import { PropsWithChildren, ReactNode } from 'react';
import { css } from '@emotion/react';

interface Props {
  className?: string;
}

const List = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <ul
      className={className}
      css={css`
        padding: 0 24px;
        display: flex;
        flex-direction: column;
        > li:not(:first-of-type) {
          margin-top: 15px;
        }
      `}
    >
      {children}
    </ul>
  );
};

interface ListRowProps {
  className?: string;
  left: ReactNode;
  right: ReactNode;
}

List.Row = ({ className, left, right }: ListRowProps) => {
  return (
    <li
      className={className}
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      {left}
      {right}
    </li>
  );
};

export default List;
