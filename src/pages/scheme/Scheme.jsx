import { Box, useMediaQuery } from "@material-ui/core";
import { ScreenLoader } from "components/common";
import { MouseModes } from "constant";
import { focusBoardQuickly, isWindows } from "helper";
import { useBoardSocket, useCapture, useZoom, withKeyEvent } from "hooks";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import useInterval from "react-useinterval";
import { setBoardRotate, setisAboveMobile } from "redux/reducers/boardReducer";
import { getCarRaces } from "redux/reducers/carReducer";
import { getDownloaderStatus } from "redux/reducers/downloaderReducer";
import { getFontList } from "redux/reducers/fontReducer";
import { setLoadedStatusAll } from "redux/reducers/layerReducer";
import { getLogoList } from "redux/reducers/logoReducer";
import { setMessage } from "redux/reducers/messageReducer";
import { getOverlayList } from "redux/reducers/overlayReducer";
import {
  getFavoriteList,
  getScheme,
  getSharedUsers,
  setLoaded,
} from "redux/reducers/schemeReducer";
import { getUploadListByUserID } from "redux/reducers/uploadReducer";

import {
  Board,
  BoardGuide,
  Header,
  LeftBar,
  MobileDrawerBar,
  MobileLayersBar,
  MobilePropertyBar,
  MobileToolbar,
  PropertyBar as DesktopPropertyBar,
  Toolbar as DesktopToolbar,
} from "./components";
import { LegacyBanner } from "./components/LegacyBanner";
import { ReconnectionBanner } from "./components/ReconnectionBanner";
import { withWrapper } from "./withWrapper";

const Scheme = React.memo((props) => {
  const {
    editable,
    dialog,
    setDialog,
    stageRef,
    baseLayerRef,
    mainLayerRef,
    carMaskLayerRef,
    onKeyEvent,
    onDeleteLayer,
    onCloneLayer,
    unsetDeleteLayerState,
  } = props;
  useBoardSocket();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { onZoomFit } = useZoom(stageRef);
  const isAboveMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [hoveredJSON, setHoveredJSON] = useState({});
  const [transformingLayer, setTransformingLayer] = useState(null);

  const activeTransformerRef = useRef(null);
  const hoveredTransformerRef = useRef(null);

  const {
    handleUploadThumbnail,
    handleDownloadTGA,
    handleDownloadSpecTGA,
    retrieveTGAPNGDataUrl,
    requestSpecTGAPNGDataUrl,
  } = useCapture(
    stageRef,
    baseLayerRef,
    mainLayerRef,
    carMaskLayerRef,
    unsetDeleteLayerState
  );

  const user = useSelector((state) => state.authReducer.user);
  const blockedBy = useSelector((state) => state.authReducer.blockedBy);
  const previousPath = useSelector((state) => state.authReducer.previousPath);
  const mouseMode = useSelector((state) => state.boardReducer.mouseMode);
  const pressedKey = useSelector((state) => state.boardReducer.pressedKey);
  const currentScheme = useSelector((state) => state.schemeReducer.current);
  const schemeLoaded = useSelector((state) => state.schemeReducer.loaded);
  const schemeSocketConnected = useSelector(
    (state) => state.schemeReducer.socketConnected
  );

  const loadedStatuses = useSelector(
    (state) => state.layerReducer.loadedStatuses
  );
  const overlayList = useSelector((state) => state.overlayReducer.list);
  const logoList = useSelector((state) => state.logoReducer.list);
  const fontList = useSelector((state) => state.fontReducer.list);
  const sharedUsers = useSelector((state) => state.schemeReducer.sharedUsers);
  const favoriteSchemeList = useSelector(
    (state) => state.schemeReducer.favoriteList
  );

  const schemeLoading = useSelector((state) => state.schemeReducer.loading);
  const carMakeLoading = useSelector((state) => state.carMakeReducer.loading);
  const fontLoading = useSelector((state) => state.fontReducer.loading);
  const uploadsInitialized = useSelector(
    (state) => state.uploadReducer.initialized
  );

  const [showLegacyBanner, setShowLegacyBanner] = useState(false);
  const isInWindows = useMemo(() => isWindows(), []);

  const Toolbar = isAboveMobile ? DesktopToolbar : MobileToolbar;
  const PropertyBar = isAboveMobile ? DesktopPropertyBar : MobilePropertyBar;
  const LayersContainer = isAboveMobile ? LeftBar : MobileLayersBar;

  const setHoveredJSONItem = useCallback(
    (key, value) => {
      if (value === true) setHoveredJSON({ [key]: value });
      else setHoveredJSON((origin) => ({ ...origin, [key]: value }));
    },
    [setHoveredJSON]
  );

  const handleChangeBoardRotation = useCallback(
    (newRotation) => {
      dispatch(setBoardRotate(newRotation));
      focusBoardQuickly();
    },
    [dispatch]
  );

  const handleGoBack = useCallback(async () => {
    dispatch(setLoadedStatusAll({}));
    if (isAboveMobile) {
      await handleUploadThumbnail(false);
    }
    history.push(previousPath || "/");
  }, [history, dispatch, handleUploadThumbnail, previousPath, isAboveMobile]);

  const hideLegacyBanner = useCallback(() => {
    setShowLegacyBanner(false);
    focusBoardQuickly();
  }, []);

  useEffect(() => {
    if (currentScheme) {
      setShowLegacyBanner(currentScheme.legacy_mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScheme && currentScheme.legacy_mode]);

  useEffect(() => {
    if (user && user.id && params.id) {
      if (!currentScheme) {
        dispatch(
          getScheme(
            params.id,
            (scheme, tempsharedUsers) => {
              if (
                (user.id !== scheme.user_id &&
                  !tempsharedUsers.find(
                    (shared) => shared.user_id === user.id
                  )) ||
                blockedBy.includes(scheme.user_id)
              ) {
                dispatch(
                  setMessage({
                    message: "You don't have permission for this project!",
                  })
                );
                history.push("/");
              } else {
                if (!uploadsInitialized) {
                  dispatch(getUploadListByUserID(user.id));
                }
                if (!overlayList.length) dispatch(getOverlayList());
                if (!logoList.length) dispatch(getLogoList());
                if (!fontList.length) dispatch(getFontList());
                if (!sharedUsers.length) dispatch(getSharedUsers(params.id));
                if (!favoriteSchemeList.length)
                  dispatch(getFavoriteList(user.id));
                dispatch(getCarRaces(scheme.id));
                if (isWindows()) {
                  dispatch(getDownloaderStatus());
                }
              }
            },
            () => {
              history.push("/");
            }
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (
      !schemeLoaded &&
      Object.keys(loadedStatuses).length &&
      Object.keys(loadedStatuses).every((k) => loadedStatuses[k]) &&
      stageRef.current
    ) {
      dispatch(setLoaded(true));
      onZoomFit();
      if (isAboveMobile) {
        setTimeout(handleUploadThumbnail, 5000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedStatuses, schemeLoaded]);

  useEffect(() => {
    if (editable && isAboveMobile) {
      const thumbnailInterval = setInterval(handleUploadThumbnail, 300000);
      return () => {
        clearInterval(thumbnailInterval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable]);

  useInterval(
    () => {
      if (isWindows()) {
        dispatch(getDownloaderStatus());
      }
    },
    isInWindows && user && user.id && currentScheme ? 10000 : null
  );

  useEffect(() => {
    if (stageRef.current) {
      const container = stageRef.current.attrs.container;
      let flag = false;
      for (const item of Object.keys(hoveredJSON)) {
        if (hoveredJSON[item]) {
          flag = true;
        }
      }
      if (flag) {
        if (pressedKey === "alt") {
          container.style.cursor = "copy";
        } else {
          container.style.cursor = "move";
        }
      } else {
        container.style.cursor =
          mouseMode === MouseModes.DEFAULT ? "default" : "crosshair";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredJSON, stageRef, pressedKey]);

  useEffect(() => {
    dispatch(setisAboveMobile(isAboveMobile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAboveMobile]);

  return (
    <>
      <Helmet>
        {currentScheme ? <title>{currentScheme.name}</title> : null}
      </Helmet>
      {schemeLoading || carMakeLoading || fontLoading || !currentScheme ? (
        <ScreenLoader />
      ) : (
        <Box width="100%" height="100%" display="flex" flexDirection="column">
          <KeyboardEventHandler handleKeys={["all"]} onKeyEvent={onKeyEvent} />
          <KeyboardEventHandler
            handleKeys={["all"]}
            handleEventType="keyup"
            onKeyEvent={onKeyEvent}
          />
          <Header
            editable={editable}
            onBack={handleGoBack}
            onDownloadTGA={handleDownloadTGA}
            onDownloadSpecTGA={handleDownloadSpecTGA}
            retrieveTGAPNGDataUrl={retrieveTGAPNGDataUrl}
          />
          <Box
            width="100%"
            height="calc(100% - 56px)"
            display="flex"
            justifyContent="space-between"
          >
            <LayersContainer
              dialog={dialog}
              setDialog={setDialog}
              editable={editable}
              hoveredLayerJSON={hoveredJSON}
              stageRef={stageRef}
              onBack={handleGoBack}
              onChangeHoverJSONItem={setHoveredJSONItem}
            />
            <Box
              bgcolor="#282828"
              overflow="hidden"
              flexGrow="1"
              position="relative"
            >
              {!isAboveMobile ? (
                <MobileDrawerBar
                  dialog={dialog}
                  setDialog={setDialog}
                  stageRef={stageRef}
                  editable={editable}
                />
              ) : (
                <></>
              )}
              <Board
                hoveredLayerJSON={hoveredJSON}
                editable={editable}
                onChangeHoverJSONItem={setHoveredJSONItem}
                stageRef={stageRef}
                baseLayerRef={baseLayerRef}
                mainLayerRef={mainLayerRef}
                carMaskLayerRef={carMaskLayerRef}
                activeTransformerRef={activeTransformerRef}
                hoveredTransformerRef={hoveredTransformerRef}
                setTransformingLayer={setTransformingLayer}
                onDeleteLayer={onDeleteLayer}
                onCloneLayer={onCloneLayer}
              />
              <BoardGuide />
              <LegacyBanner
                show={showLegacyBanner}
                carMakeID={currentScheme.car_make}
                onDismiss={hideLegacyBanner}
              />
              <ReconnectionBanner show={!schemeSocketConnected} />
              <Toolbar
                stageRef={stageRef}
                editable={editable}
                retrieveTGAPNGDataUrl={retrieveTGAPNGDataUrl}
                requestSpecTGAPNGDataUrl={requestSpecTGAPNGDataUrl}
                onChangeBoardRotation={handleChangeBoardRotation}
              />
            </Box>
            <PropertyBar
              stageRef={stageRef}
              editable={editable}
              transformingLayer={transformingLayer}
              onCloneLayer={onCloneLayer}
              onDeleteLayer={onDeleteLayer}
            />
          </Box>
        </Box>
      )}
    </>
  );
});

const SchemeWithWrapper = withWrapper(withKeyEvent(Scheme));

export { SchemeWithWrapper as Scheme };
