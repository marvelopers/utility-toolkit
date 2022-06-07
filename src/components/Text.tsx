import colors from 'constants/colors';
import classnames from 'classnames';
import React, { ReactNode, AllHTMLAttributes, forwardRef, Ref, CSSProperties } from 'react';

export const Typography = {
  T1: 't1',
  T2: 't2',
  T3: 't3',
  T4: 't4',
  T5: 't5',
  T6: 't6',
  T7: 't7',
  ST1: 'st1',
  ST2: 'st2',
  ST3: 'st3',
  ST4: 'st4',
  ST5: 'st5',
  ST6: 'st6',
  ST7: 'st7',
  ST8: 'st8',
  ST9: 'st9',
  ST10: 'st10',
  ST11: 'st11',
  ST12: 'st12',
  ST13: 'st13',
} as const;

export type TypographyValue = typeof Typography[keyof typeof Typography];

export const FontWeight = {
  Regular: 'regular' as const,
  Medium: 'medium' as const,
  Semibold: 'semibold' as const,
  Bold: 'bold' as const,
};
export type FontWeightValue = typeof FontWeight[keyof typeof FontWeight];

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  typography?: TypographyValue;
  fontWeight?: FontWeightValue;
  color?: string;
  ellipsisAfterLines?: number;
  stringToJSX?: boolean;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  /**
   * @description word-break: keep-all을 적용할지 여부를 나타냅니다.
   * @default true
   */
  wordBreak?: boolean;
  /**
   * @deprecated
   */
  spanAttributes?: AllHTMLAttributes<any>;
}

export type Props = BaseProps;

type TextProps<Element extends keyof JSX.IntrinsicElements = 'span'> = BaseProps & {
  as?: Element;
} & Omit<AllHTMLAttributes<Element>, 'as'>;

function Text<Element extends keyof JSX.IntrinsicElements = 'span'>(props: TextProps<Element>, ref: Ref<HTMLElement>) {
  const {
    as: Component = 'span',
    className,
    children,
    ellipsisAfterLines,
    typography,
    fontWeight,
    color = colors.grey900,
    stringToJSX,
    display = 'inline-block',
    textAlign,
    style,
    spanAttributes,
    wordBreak = true,
    role,
    ...rest
  } = props as TextProps;

  const isSingleLine = ellipsisAfterLines !== undefined && ellipsisAfterLines === 1;
  const isMultiLine = ellipsisAfterLines !== undefined && ellipsisAfterLines > 1;

  return (
    <Component
      ref={ref}
      role={role ?? (Component === 'span' ? 'text' : undefined)}
      {...rest}
      {...(spanAttributes as any)}
      className={classnames(
        'text',
        {
          'text--single-line': isSingleLine,
          'text--multi-line': isMultiLine,
          'text--word-break': isSingleLine ? false : wordBreak,
          [`typography-${typography}`]: typography,
          [`text--font-weight-${fontWeight}`]: fontWeight,
          [`text--display-${display}`]: display && !isSingleLine && !isMultiLine,
          [`text--as`]: Component !== 'span',
        },
        className
      )}
      style={{
        color,
        WebkitLineClamp: isMultiLine ? ellipsisAfterLines : undefined,
        textAlign,
        ...style,
      }}
    >
      {stringToJSX === true && typeof children === 'string' ? convertNewLineToJSX(children) : children}
    </Component>
  );
}

export default forwardRef(Text);

function convertNewLineToJSX(str: string) {
  return str.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <br /> : ''}
      {line}
    </React.Fragment>
  ));
}
