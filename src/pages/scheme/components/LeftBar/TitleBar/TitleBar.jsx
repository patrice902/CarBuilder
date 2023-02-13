import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, IconButton } from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { LightTooltip } from "components/common";
import { SchemeSettingsDialog } from "components/dialogs";
import { DialogTypes } from "constant";
import { focusBoardQuickly } from "helper";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScheme } from "redux/reducers/schemeReducer";
import { useDebouncedCallback } from "use-debounce";

import { CustomIcon, NameInput } from "./TitleBar.style";

export const TitleBar = React.memo((props) => {
  const { editable, onBack } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [dialog, setDialog] = useState(null);

  const currentScheme = useSelector((state) => state.schemeReducer.current);

  const hideDialog = useCallback(() => {
    setDialog(null);
    focusBoardQuickly();
  }, []);

  const handleSaveName = useDebouncedCallback(() => {
    dispatch(updateScheme({ id: currentScheme.id, name }, true, false));
  }, 1000);

  const handleNameChange = useCallback(
    (event) => {
      setName(event.target.value);
      handleSaveName();
    },
    [handleSaveName]
  );

  useEffect(() => {
    if (currentScheme) {
      setName(currentScheme.name);
    }
  }, [currentScheme]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl={1}
      my={1}
    >
      <Box display="flex" alignItems="center" flexGrow={1}>
        <Box mr={1}>
          <LightTooltip title="Back" arrow>
            <IconButton size="medium" onClick={onBack}>
              <CustomIcon icon={faChevronLeft} size="xs" />
            </IconButton>
          </LightTooltip>
        </Box>
        <NameInput
          value={name}
          onChange={handleNameChange}
          inputProps={{ maxLength: "50" }}
        />
      </Box>
      <Box display="flex" marginLeft="4px">
        <LightTooltip title="Settings" arrow>
          <IconButton
            size="medium"
            onClick={() => setDialog(DialogTypes.SETTINGS)}
          >
            <SettingsIcon />
          </IconButton>
        </LightTooltip>
      </Box>

      <SchemeSettingsDialog
        editable={editable}
        open={dialog === DialogTypes.SETTINGS}
        onCancel={hideDialog}
      />
    </Box>
  );
});

export default TitleBar;
