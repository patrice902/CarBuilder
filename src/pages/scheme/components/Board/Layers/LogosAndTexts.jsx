import React, { useMemo, useCallback } from "react";
import _ from "lodash";

import config from "config";
import { FinishOptions, LayerTypes, MouseModes, ViewModes } from "constant";
import { getRelativeShadowOffset } from "helper";

import { GroupedURLImage, TextNode } from "components/konva";
import { useDispatch, useSelector } from "react-redux";
import { useLayer, useScheme } from "hooks";
import { insertToLoadedList as insertToLoadedFontList } from "redux/reducers/fontReducer";

export const LogosAndTexts = React.memo((props) => {
  const {
    stageRef,
    editable,
    onSetTransformingLayer,
    onHover,
    onLayerDragStart,
    onLayerDragEnd,
  } = props;

  const dispatch = useDispatch();
  const {
    layerList,
    loadedStatuses,
    cloningLayer,
    cloningQueue,
    onLoadLayer,
    onLayerSelect: onSelect,
    onLayerDataChange: onChange,
    onCloneMoveLayer: onCloneMove,
    onDblClickLayer: onDblClick,
  } = useLayer();

  const { guideData } = useScheme();

  const frameSize = useSelector((state) => state.boardReducer.frameSize);
  const mouseMode = useSelector((state) => state.boardReducer.mouseMode);
  const viewMode = useSelector((state) => state.boardReducer.viewMode);
  const boardRotate = useSelector((state) => state.boardReducer.boardRotate);
  const paintingGuides = useSelector(
    (state) => state.boardReducer.paintingGuides
  );
  const loadedFontList = useSelector((state) => state.fontReducer.loadedList);
  const fonts = useSelector((state) => state.fontReducer.list);

  const specMode = useMemo(() => viewMode === ViewModes.SPEC_VIEW, [viewMode]);

  const filteredLayers = useMemo(
    () =>
      _.orderBy(
        layerList.filter(
          (item) =>
            item.layer_type === LayerTypes.LOGO ||
            item.layer_type === LayerTypes.UPLOAD ||
            item.layer_type === LayerTypes.TEXT
        ),
        ["layer_order"],
        ["desc"]
      ),
    [layerList]
  );
  const resultLayers = useMemo(() => {
    let newLayers = [...filteredLayers];
    if (cloningLayer) {
      newLayers = [...newLayers, cloningLayer];
    }
    if (cloningQueue.length) {
      newLayers = [...newLayers, ...cloningQueue];
    }
    return newLayers;
  }, [cloningLayer, cloningQueue, filteredLayers]);

  const layerFont = useCallback(
    (layer) => {
      return fonts.length
        ? fonts.find((item) => item.id === layer.layer_data.font)
        : {};
    },
    [fonts]
  );
  const getShadowOffset = useCallback(
    (layer) => {
      return getRelativeShadowOffset(boardRotate, {
        x: layer.layer_data.shadowOffsetX,
        y: layer.layer_data.shadowOffsetY,
      });
    },
    [boardRotate]
  );

  const getLayerImage = useCallback((layer) => {
    return layer.layer_data.legacy
      ? `${config.legacyAssetURL}/layers/layer_${layer.id}.png`
      : layer.layer_data.fromOldSource
      ? `${config.legacyAssetURL}/${layer.layer_data.source_file}`
      : `${config.assetsURL}/${layer.layer_data.source_file}`;
  }, []);

  const onFontLoad = useCallback(
    (fontFamily) => {
      dispatch(insertToLoadedFontList(fontFamily));
    },
    [dispatch]
  );

  return (
    <>
      {resultLayers.map((layer) => {
        let shadowOffset = getShadowOffset(layer);

        if (layer.layer_type !== LayerTypes.TEXT) {
          return (
            <GroupedURLImage
              key={layer.id}
              id={layer.id}
              layer={layer}
              cloningLayer={cloningLayer}
              stageRef={stageRef}
              name={layer.id.toString()}
              editable={editable}
              src={getLayerImage(layer)}
              loadedStatus={loadedStatuses[layer.id]}
              x={parseFloat(layer.layer_data.left || 0)}
              y={parseFloat(layer.layer_data.top || 0)}
              allowFit={true}
              width={layer.layer_data.width}
              height={layer.layer_data.height}
              frameSize={frameSize}
              rotation={layer.layer_data.rotation}
              boardRotate={boardRotate}
              scaleX={layer.layer_data.flop === 1 ? -1 : 1}
              scaleY={layer.layer_data.flip === 1 ? -1 : 1}
              filterColor={
                specMode
                  ? layer.layer_data.finish || FinishOptions[0].value
                  : layer.layer_data.color
              }
              shadowColor={
                specMode
                  ? layer.layer_data.finish || FinishOptions[0].value
                  : layer.layer_data.shadowColor
              }
              bgColor={
                specMode
                  ? layer.layer_data.bgColor
                    ? layer.layer_data.finish || FinishOptions[0].value
                    : null
                  : layer.layer_data.bgColor
              }
              paddingX={layer.layer_data.paddingX}
              paddingY={layer.layer_data.paddingY}
              shadowBlur={layer.layer_data.shadowBlur}
              shadowOpacity={layer.layer_data.shadowOpacity}
              shadowOffsetX={shadowOffset.x}
              shadowOffsetY={shadowOffset.y}
              skewX={
                Math.abs(layer.layer_data.skewX) >= 1
                  ? layer.layer_data.skewX / 10
                  : layer.layer_data.skewX
              }
              skewY={
                Math.abs(layer.layer_data.skewY) >= 1
                  ? layer.layer_data.skewY / 10
                  : layer.layer_data.skewY
              }
              opacity={layer.layer_data.opacity}
              paintingGuides={paintingGuides}
              guideData={guideData}
              onSelect={() => onSelect(layer)}
              onDblClick={onDblClick}
              listening={
                !layer.layer_locked && mouseMode === MouseModes.DEFAULT
              }
              onChange={(values, pushingToHistory) =>
                onChange(layer, values, pushingToHistory)
              }
              onHover={(flag) => onHover(layer, flag)}
              visible={layer.layer_visible ? true : false}
              onLoadLayer={onLoadLayer}
              onDragStart={onLayerDragStart}
              onDragEnd={onLayerDragEnd}
              onCloneMove={onCloneMove}
              onSetTransformingLayer={onSetTransformingLayer}
            />
          );
        }
        let font = layerFont(layer);
        return (
          <TextNode
            key={layer.id}
            id={layer.id}
            layer={layer}
            cloningLayer={cloningLayer}
            editable={editable}
            stageRef={stageRef}
            frameSize={frameSize}
            name={layer.id.toString()}
            text={layer.layer_data.text}
            fontFamily={font.font_name}
            fontFile={
              font.font_file
                ? `url(${config.assetsURL}/${font.font_file})`
                : null
            }
            loadedFontList={loadedFontList}
            loadedStatus={loadedStatuses[layer.id]}
            onFontLoad={onFontLoad}
            fontSize={layer.layer_data.size}
            fill={
              specMode
                ? layer.layer_data.finish || FinishOptions[0].value
                : layer.layer_data.color
            }
            strokeWidth={layer.layer_data.stroke}
            stroke={
              specMode
                ? layer.layer_data.finish || FinishOptions[0].value
                : layer.layer_data.scolor
            }
            strokeEnabled={true}
            x={parseFloat(layer.layer_data.left || 0)}
            y={parseFloat(layer.layer_data.top || 0)}
            skewX={
              Math.abs(layer.layer_data.skewX) >= 1
                ? layer.layer_data.skewX / 10
                : layer.layer_data.skewX
            }
            skewY={
              Math.abs(layer.layer_data.skewY) >= 1
                ? layer.layer_data.skewY / 10
                : layer.layer_data.skewY
            }
            offsetX={0}
            offsetY={0}
            // width={layer.layer_data.width}
            // height={layer.layer_data.height}
            opacity={layer.layer_data.opacity}
            rotation={layer.layer_data.rotation}
            scaleX={
              (layer.layer_data.scaleX || 1) *
              (layer.layer_data.flop === 1 ? -1 : 1)
            }
            scaleY={
              (layer.layer_data.scaleY || 1) *
              (layer.layer_data.flip === 1 ? -1 : 1)
            }
            shadowColor={
              specMode
                ? layer.layer_data.finish || FinishOptions[0].value
                : layer.layer_data.shadowColor
            }
            shadowBlur={layer.layer_data.shadowBlur}
            shadowOpacity={layer.layer_data.shadowOpacity}
            shadowOffsetX={shadowOffset.x}
            shadowOffsetY={shadowOffset.y}
            visible={layer.layer_visible ? true : false}
            paintingGuides={paintingGuides}
            guideData={guideData}
            onSelect={() => onSelect(layer)}
            onDblClick={onDblClick}
            listening={!layer.layer_locked && mouseMode === MouseModes.DEFAULT}
            onChange={(value, pushingToHistory) =>
              onChange(layer, value, pushingToHistory)
            }
            onHover={(flag) => onHover(layer, flag)}
            onLoadLayer={onLoadLayer}
            onDragStart={onLayerDragStart}
            onDragEnd={onLayerDragEnd}
            onCloneMove={onCloneMove}
            onSetTransformingLayer={onSetTransformingLayer}
          />
        );
      })}
    </>
  );
});

export default LogosAndTexts;
