import { css } from '@emotion/react';
import colors from 'constants/colors';
import React, { useState } from 'react';

export type TextAreaAttributes = {
  value?: string;
} & Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'readOnly'
  | 'rows'
  | 'placeholder'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
>;

export type Props = {
  /**
   * 컴포넌트의 root element(`div`)에 추가되는 className입니다.
   */
  className?: string;

  /**
   * 에러 상태를 표시합니다.
   */
  hasError?: boolean;
} & TextAreaAttributes;

function TextArea({ disabled, hasError, className, onFocus, onBlur, ...textareaAttrs }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={className}
      css={[
        css`
          position: relative;
          display: flex;
          justify-content: space-between;
          transition: background-color 0.2s ease;
          background-color: ${colors.grey50};
          border-radius: 12px;
          align-items: center;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02);
          font-weight: 500;
          color: ${colors.grey800};
          padding: 16px;
          height: auto;
        `,
        hasError
          ? css`
              caret-color: ${colors.red600};
              background-color: rgba(183, 28, 28, 0.05);
            `
          : null,
        isFocused
          ? css`
              background-color: rgba(25, 74, 166, 0.05);
            `
          : null,
      ]}
    >
      <textarea
        css={css`
          background-color: transparent;
          border: none;
          appearance: none;
          overflow: hidden;
          resize: none;
          box-shadow: 0;
          min-width: 0;
          width: 100%;
          color: ${colors.grey900};
          min-height: 80px;

          &:focus {
            outline: 0;
          }
        `}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        {...textareaAttrs}
      />
    </div>
  );
}

export default TextArea;
