import { Box, TextField } from "components/MaterialUI";
import styled from "styled-components/macro";

export const CustomeTextField = styled(TextField)`
  .MuiInputBase-input {
    height: 2rem;
  }
`;
export const TextPreviewWrapper = styled(Box)`
  overflow: hidden;
  background: #${(props) => props.backcolor};
`;
export const TextPreview = styled(Box)`
  color: ${(props) => props.color};
  -webkit-text-stroke-width: ${(props) => props.stroke}px;
  -webkit-text-stroke-color: ${(props) => props.scolor};
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  transform: rotate(${(props) => props.rotate}deg);
`;
