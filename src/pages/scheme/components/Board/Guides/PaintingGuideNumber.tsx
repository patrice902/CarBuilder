import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { URLImage } from "src/components/konva";
import { carMakeAssetURL, legacyCarMakeAssetURL } from "src/helper";
import { useLayer, useScheme } from "src/hooks";
import { RootState } from "src/redux";
import { PaintingGuides, ViewModes } from "src/types/enum";

export const PaintingGuideNumber = React.memo(() => {
  const { legacyMode, guideData } = useScheme();
  const { loadedStatuses, onLoadLayer, onExpandFrameFromImage } = useLayer();

  const carMake = useSelector(
    (state: RootState) => state.carMakeReducer.current
  );
  const paintingGuides = useSelector(
    (state: RootState) => state.boardReducer.paintingGuides
  );
  const viewMode = useSelector(
    (state: RootState) => state.boardReducer.viewMode
  );
  const specMode = useMemo(() => viewMode === ViewModes.SPEC_VIEW, [viewMode]);

  const getCarMakeImage = useCallback(
    (image: string) =>
      (legacyMode ? legacyCarMakeAssetURL(carMake) : carMakeAssetURL(carMake)) +
      image,
    [legacyMode, carMake]
  );

  return (
    <URLImage
      id="guide-numberblocks"
      loadedStatus={loadedStatuses["guide-numberblocks"]}
      src={getCarMakeImage("number_blocks.png")}
      x={0}
      y={0}
      width={legacyMode ? 1024 : 2048}
      height={legacyMode ? 1024 : 2048}
      tellSize={onExpandFrameFromImage}
      filterColor={guideData?.numberblock_color}
      opacity={guideData?.numberblock_opacity}
      listening={false}
      visible={
        !specMode && paintingGuides.includes(PaintingGuides.NUMBERBLOCKS)
      }
      onLoadLayer={onLoadLayer}
    />
  );
});

export default PaintingGuideNumber;
