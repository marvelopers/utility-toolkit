import { css } from '@emotion/react';

interface Props {
  onBackClick?: () => void;
}

const Header = ({ onBackClick }: Props) => {
  return (
    <header
      css={css`
        display: flex;
        padding: 10px 8px;
      `}
    >
      <button
        css={css`
          border: none;
          background-color: transparent;
          &:focus {
            outline: none;
          }
        `}
        onClick={onBackClick}
      >
        <img
          css={css`
            width: 30px;
            height: 30px;
          `}
          src="https://static.toss.im/icons/png/4x/icon-arrow-left-small.png"
          alt="뒤로가기"
        />
      </button>
    </header>
  );
};

export default Header;
