import { CssBaseline, withWidth } from "@material-ui/core";
import { withMessage } from "hooks/withMessage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { GlobalStyle, Root } from "./Main.style";

export const Main = withMessage(
  withWidth()(({ children }) => {
    const history = useHistory();
    const user = useSelector((state) => state.authReducer.user);

    useEffect(() => {
      if (!user) {
        history.push("/auth/sign-in");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </Root>
    );
  })
);
