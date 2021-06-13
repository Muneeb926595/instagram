import styled from "styled-components";
import { rowStyles } from "@styles";

const Row = styled.div`
  display: flex;
  ${(props) => props.flexEnd && `align-items: flex-end;`};
  ${(props) => rowStyles(props)}
`;

export default Row;
