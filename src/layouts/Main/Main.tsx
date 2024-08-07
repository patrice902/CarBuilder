import { CssBaseline, withWidth } from "@material-ui/core";
import { useFeatureFlag } from "configcat-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import config from "src/config";
import { withEmergencyShutdown } from "src/hooks";
import { withMessage } from "src/hooks/withMessage";
import { RootState } from "src/redux";
import { ConfigCatFlags } from "src/types/enum";

import { GlobalStyle, Root } from "./Main.style";

const InnerMain: React.FC = withEmergencyShutdown(
  withMessage(({ children }) => {
    const history = useHistory();
    const user = useSelector((state: RootState) => state.authReducer.user);

    const { value: disableAppLogin } = useFeatureFlag(
      ConfigCatFlags.DISABLE_APP_LOGIN,
      false
    );

    useEffect(() => {
      if (!user) {
        if (disableAppLogin) {
          window.location.href = config.parentAppURL + "/login";
        } else {
          history.push("/auth/sign-in");
        }
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

export const Main = withWidth()(InnerMain);
