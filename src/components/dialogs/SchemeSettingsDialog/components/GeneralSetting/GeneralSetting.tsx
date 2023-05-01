import { faStar as faStarOff } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  IconButton,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  Save as SaveIcon,
  SettingsBackupRestore as BackUpIcon,
} from "@material-ui/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { LightTooltip } from "src/components/common";
import { ConfirmDialog } from "src/components/dialogs";
import { getUserName } from "src/helper";
import { RootState } from "src/redux";
import { updateScheme } from "src/redux/reducers/schemeReducer";
import { CarMake } from "src/types/model";
import { BuilderSchemeJSON, UserWithoutPassword } from "src/types/query";

import {
  CustomButton,
  CustomDialogContent,
  CustomFormControlLabel,
} from "./styles";

type GeneralSettingProps = {
  editable: boolean;
  favoriteID?: number;
  scheme: BuilderSchemeJSON;
  currentUser: UserWithoutPassword;
  currentCarMake: CarMake;
  owner?: UserWithoutPassword | null;
  modifier?: UserWithoutPassword | null;
  onRemoveFavorite: (id: number, callback: () => void) => void;
  onAddFavorite: (
    user_id: number,
    scheme_id: number,
    callback: () => void
  ) => void;
  onClose: () => void;
  onDelete: (id: number, callback: () => void) => void;
  onRename: (id: number, name: string) => void;
  onRenewCarMakeLayers: () => void;
};

export const GeneralSetting = React.memo(
  ({
    editable,
    favoriteID,
    scheme,
    currentUser,
    currentCarMake,
    owner,
    modifier,
    onRemoveFavorite,
    onAddFavorite,
    onClose,
    onDelete,
    onRename,
    onRenewCarMakeLayers,
  }: GeneralSettingProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAboveMobile = useMediaQuery((theme: Theme) =>
      theme.breakpoints.up("sm")
    );

    const [favoriteInPrgoress, setFavoriteInPrgoress] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState<
      string | JSX.Element | null
    >(null);
    const [resetCarMakeMessage, setResetCarMakeMessage] = useState<
      string | JSX.Element | null
    >(null);
    const [name, setName] = useState(scheme.name);
    const currentScheme = useSelector(
      (state: RootState) => state.schemeReducer.current
    );
    const cars = useSelector((state: RootState) => state.carReducer.cars);

    const hasPrimaryRace = useMemo(() => cars.some((car) => car.primary), [
      cars,
    ]);

    const handleUpdateHideSpec = useCallback(
      (flag) => {
        dispatch(
          updateScheme({
            ...currentScheme,
            hide_spec: flag,
          })
        );
      },
      [dispatch, currentScheme]
    );

    const hideDeleteMessage = useCallback(() => setDeleteMessage(null), []);
    const hideResetCarMakeMessage = useCallback(
      () => setResetCarMakeMessage(null),
      []
    );

    const handleToggleFavorite = useCallback(() => {
      setFavoriteInPrgoress(true);
      if (favoriteID)
        onRemoveFavorite(favoriteID, () => setFavoriteInPrgoress(false));
      else
        onAddFavorite(currentUser.id, scheme.id, () =>
          setFavoriteInPrgoress(false)
        );
    }, [
      favoriteID,
      onRemoveFavorite,
      onAddFavorite,
      currentUser.id,
      scheme.id,
    ]);

    const handleNameChange = useCallback(
      (event) => {
        setName(event.target.value);
      },
      [setName]
    );
    const handleSaveName = useCallback(() => {
      onRename(scheme.id, name);
    }, [onRename, scheme.id, name]);
    const handleDiscardName = useCallback(() => {
      setName(scheme.name);
    }, [setName, scheme.name]);
    const handleNameKeyDown = useCallback(
      (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          handleSaveName();
        }
      },
      [handleSaveName]
    );

    const handleDelete = useCallback(() => {
      onDelete(scheme.id, () => history.push("/"));
    }, [history, onDelete, scheme.id]);

    useEffect(() => {
      setName(scheme.name);
    }, [scheme.name]);

    return (
      <>
        <CustomDialogContent dividers>
          {favoriteInPrgoress ? (
            <CircularProgress size={30} style={{ marginBottom: "8px" }} />
          ) : (
            <CustomButton
              startIcon={
                favoriteID ? (
                  <FontAwesomeIcon icon={faStarOn} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faStarOff} size="sm" />
                )
              }
              style={{ marginBottom: "8px" }}
              onClick={handleToggleFavorite}
            >
              Favorite
            </CustomButton>
          )}

          <Box display="flex" my={2}>
            <TextField
              label="Name"
              variant="outlined"
              disabled={!editable}
              value={name}
              inputProps={{ maxLength: "50" }}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown}
              style={{ width: "300px", marginRight: "8px" }}
            />
            {scheme && name !== scheme.name ? (
              <LightTooltip
                title="Discard Change"
                arrow
                style={{ marginRight: "4px" }}
              >
                <IconButton onClick={handleDiscardName} color="secondary">
                  <BackUpIcon />
                </IconButton>
              </LightTooltip>
            ) : (
              <></>
            )}
            {scheme && name !== scheme.name ? (
              <LightTooltip title="Save" arrow>
                <IconButton onClick={handleSaveName}>
                  <SaveIcon />
                </IconButton>
              </LightTooltip>
            ) : (
              <></>
            )}
          </Box>

          <Box pl={2}>
            <Typography>Owner: {getUserName(owner)}</Typography>
            <Typography>
              Created: {new Date(scheme.date_created * 1000).toDateString()}
            </Typography>
            <Typography>
              Last Modified:{" "}
              {new Date(scheme.date_modified * 1000).toDateString()} By{" "}
              {getUserName(modifier)}
            </Typography>
          </Box>

          <CustomFormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={!currentScheme?.hide_spec}
                disabled={!editable}
                onChange={(event) =>
                  handleUpdateHideSpec(!event.target.checked)
                }
              />
            }
            label="Show Spec TGA/Finish"
            labelPlacement="start"
          />

          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            {editable ? (
              <CustomButton
                color="secondary"
                style={{ marginRight: "8px" }}
                onClick={() =>
                  setResetCarMakeMessage(
                    <>
                      Are you sure you want to reset template layers?
                      <br />
                      This will update all Car Parts to the latest default
                      settings available for this vehicle.
                    </>
                  )
                }
              >
                {isAboveMobile
                  ? `Reset ${currentCarMake.name} template layers`
                  : `Reset Template Layers`}
              </CustomButton>
            ) : (
              <></>
            )}

            {owner?.id === currentUser.id ? (
              <CustomButton
                onClick={() =>
                  setDeleteMessage(
                    <>
                      Are you sure you want to delete &quot;{scheme.name}&quot;?
                      {hasPrimaryRace && (
                        <>
                          <br />
                          This project is associated with an active paint for
                          your&nbsp;
                          {currentCarMake.name}. <br />
                          If you delete this project, you won&quot;t be able to
                          make changes.
                        </>
                      )}
                    </>
                  )
                }
                color="secondary"
              >
                Delete Project
              </CustomButton>
            ) : (
              <></>
            )}
          </Box>
        </CustomDialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>

        <ConfirmDialog
          text={deleteMessage}
          open={!!deleteMessage}
          onCancel={hideDeleteMessage}
          onConfirm={handleDelete}
        />

        <ConfirmDialog
          text={resetCarMakeMessage}
          open={!!resetCarMakeMessage}
          onCancel={hideResetCarMakeMessage}
          onConfirm={onRenewCarMakeLayers}
        />
      </>
    );
  }
);
