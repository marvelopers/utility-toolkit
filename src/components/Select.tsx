import { css } from '@emotion/react';
import colors from 'constants/colors';

type Props = JSX.IntrinsicElements['select'];

const Select = ({ className, ...rest }: Props) => {
  return (
    <div
      className={className}
      css={css`
        position: relative;
      `}
    >
      <select
        {...rest}
        css={css`
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
          height: 52px;
          transition: background-color 0.2s ease;
          background-color: ${colors.grey50};
          border-radius: 14px;
          align-items: center;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02);
          color: ${colors.grey800};
          width: 100%;
          margin: 0;
          border: 0 solid transparent;
          padding: 0;
          outline: none;
          appearance: none;
          padding: 0 24px 0 16px;
        `}
      />
      <img
        src="https://static.toss.im/icons/svg/icn-arrow-downwards.svg"
        width="24"
        height="24"
        css={css`
          position: absolute;
          top: 14px;
          right: 16px;
        `}
      />
    </div>
  );
};

export default Select;
