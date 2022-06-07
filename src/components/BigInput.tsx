import colors from 'constants/colors';
import styled from '@emotion/styled';

const BigInput = styled.input`
  color: ${colors.grey800};
  height: 52px;
  padding: 0 0 8px;
  font-weight: 500;
  font-size: 30px;
  border-radius: 1px;
  caret-color: ${colors.blue400};
  outline: none;
  border: 0 none;
  border-bottom: 2px solid ${colors.grey300};
  :focus {
    border-bottom-color: ${colors.blue400};
  }
  transition: background-color 0.2s ease;
`;

export default BigInput;
