import { CssBaseline } from "@material-ui/core";
import { withEmergencyShutdown } from "src/hooks";
import { withMessage } from "src/hooks/withMessage";

import { GlobalStyle, Root } from "./Auth.style";

export const Auth = withEmergencyShutdown(
  withMessage(({ children }) => (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </Root>
  ))
);
