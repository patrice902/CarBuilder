import { hexToRgba } from "helper";
import { useDrag, useKonvaImageInit, useTransform } from "hooks";
import Konva from "konva";
import React, { useMemo, useRef } from "react";
import { Image } from "react-konva";

export const URLImage = React.memo(
  ({
    id,
    src,
    stageRef,
    filterColor,
    frameSize,
    allowFit,
    layer,
    cloningLayer,
    loadedStatus,
    boardRotate = 0,
    onLoadLayer,
    tellSize,
    stroke,
    strokeWidth,
    strokeScale,
    shadowBlur,
    shadowColor,
    shadowOffsetX,
    shadowOffsetY,
    paintingGuides,
    guideData,
    onSelect,
    onDblClick,
    onChange,
    onHover,
    onDragStart,
    onDragEnd,
    onCloneMove,
    ...props
  }) => {
    const shapeRef = useRef();

    const isSVG = useMemo(() => src.toLowerCase().includes(".svg"), [src]);
    const allowFilter = useMemo(
      () => !isSVG && filterColor && filterColor.length,
      [filterColor, isSVG]
    );
    const filters = useMemo(() => (allowFilter ? [Konva.Filters.RGBA] : []), [
      allowFilter,
    ]);

    const [image, , applyCaching] = useKonvaImageInit({
      imageshapeRef: shapeRef,
      id,
      src,
      stroke,
      strokeWidth,
      filterColor,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      strokeScale,
      allowFit,
      frameSize,
      loadedStatus,
      boardRotate,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
      onChange,
      tellSize,
      onLoadLayer,
    });

    const {
      dragEnabled,
      handleDragStart,
      handleDragMove,
      handleDragEnd,
      handleTouchMove,
      handleTouchEnd,
    } = useDrag({
      stageRef,
      shapeRef,
      paintingGuides,
      guideData,
      frameSize,
      layer,
      cloningLayer,
      opacity: layer ? layer.layer_data.opacity : 1,
      onSelect,
      onChange,
      onDragStart,
      onDragEnd,
      onCloneMove,
    });
    const {
      handleTransformStart,
      handleTransformEnd,
      handleTransform,
    } = useTransform({
      shapeRef,
      layer,
      frameSize,
      onChange,
      onDragStart,
      onDragEnd,
      applyCaching,
    });

    return (
      <Image
        {...props}
        image={image}
        ref={shapeRef}
        draggable={onChange && dragEnabled}
        shadowBlur={shadowBlur}
        shadowColor={shadowColor}
        shadowOffsetX={shadowOffsetX || 0}
        shadowOffsetY={shadowOffsetY || 0}
        red={allowFilter ? hexToRgba(filterColor).r : null}
        green={allowFilter ? hexToRgba(filterColor).g : null}
        blue={allowFilter ? hexToRgba(filterColor).b : null}
        alpha={allowFilter ? hexToRgba(filterColor).a / 255 : null}
        filters={allowFilter ? filters : null}
        perfectDrawEnabled={false}
        shadowForStrokeEnabled={false}
        onDblClick={onDblClick}
        onClick={onSelect}
        onTap={onSelect}
        onMouseOver={() => props.listening && onHover && onHover(true)}
        onMouseOut={() => props.listening && onHover && onHover(false)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransformStart={handleTransformStart}
        onTransformEnd={handleTransformEnd}
        onTransform={handleTransform}
      />
    );
  }
);

export default URLImage;
