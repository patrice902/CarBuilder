import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import Canvg from "canvg";
import {
  mathRound2,
  getPixelRatio,
  loadImage,
  rotatePoint,
  detectBrowser,
} from "helper";
import { replaceColors, svgToURL, urlToString } from "helper/svg";
import { useSelector } from "react-redux";
import { Browser } from "constant";

const clearCache = (node) => {
  const canvasCache = node._cache.get("canvas");
  if (canvasCache) {
    canvasCache.scene._canvas.width = 0;
    canvasCache.scene._canvas.height = 0;
    canvasCache.hit._canvas.width = 0;
    canvasCache.hit._canvas.height = 0;
    canvasCache.filter._canvas.width = 0;
    canvasCache.filter._canvas.height = 0;
  }
  node.clearCache();
};

export const useKonvaImageInit = ({
  imageshapeRef,
  id,
  src,
  stroke,
  strokeWidth,
  filterColor,
  shadowBlur,
  shadowColor,
  shadowOffsetX,
  shadowOffsetY,
  shadowOpacity,
  strokeScale,
  allowFit,
  frameSize,
  loadedStatus,
  boardRotate = 0,
  width,
  height,
  x,
  y,
  onChange,
  tellSize,
  onLoadLayer,
}) => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const isSVG = useMemo(() => src.toLowerCase().includes(".svg"), [src]);
  const isDesktop = useSelector((state) => state.boardReducer.isDesktop);

  const applyCaching = useCallback(() => {
    if (
      imageshapeRef &&
      imageshapeRef.current &&
      imageRef &&
      imageRef.current &&
      (filterColor || isDesktop || detectBrowser() !== Browser.SAFARI)
    ) {
      clearCache(imageshapeRef.current);
      const pixelRatio = getPixelRatio(imageshapeRef.current, imageRef.current);
      imageshapeRef.current.cache({
        pixelRatio,
        imageSmoothingEnabled: true,
      });
    }
  }, [imageshapeRef, imageRef, isDesktop, filterColor]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (loadedStatus !== false && loadedStatus !== true && onLoadLayer && id)
      onLoadLayer(id, false);
    if (isSVG) {
      await setImgFromSVG(src);
    } else {
      loadImage(
        src + `?timestamp=${new Date().toISOString()}`,
        imageRef,
        handleLoad,
        handleError
      );
    }
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (image && isSVG) {
      await setImgFromSVG(src);
      applyCaching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stroke, strokeWidth, filterColor]);

  useEffect(() => {
    if (image) {
      applyCaching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shadowBlur,
    shadowColor,
    shadowOffsetX,
    shadowOffsetY,
    shadowOpacity,
    width,
    height,
  ]);

  const handleLoad = useCallback(async () => {
    let originWidth =
      !allowFit ||
      (imageRef.current.width <= frameSize.width / 2 &&
        imageRef.current.height <= frameSize.height / 2)
        ? imageRef.current.width
        : frameSize.width / 2;
    let originHeight =
      !allowFit ||
      (imageRef.current.width <= frameSize.width / 2 &&
        imageRef.current.height <= frameSize.height / 2)
        ? imageRef.current.height
        : ((frameSize.width / 2) * imageRef.current.height) /
          imageRef.current.width;
    let targetWidth = width || originWidth || 200;
    let targetHeight = height || originHeight || 200;

    if (isSVG && detectBrowser() === Browser.FIREFOX) {
      let canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const v = await Canvg.from(ctx, imageRef.current.src, {
        enableRedraw: true,
      });
      await v.render();
      setImage(canvas);
    } else {
      setImage(imageRef.current);
    }

    if (onChange && !width && !height && targetWidth && targetHeight) {
      const offset = rotatePoint(targetWidth, targetHeight, boardRotate);
      onChange(
        {
          left: mathRound2(x - offset.x / 2),
          top: mathRound2(y - offset.y / 2),
          width: mathRound2(targetWidth),
          height: mathRound2(targetHeight),
        },
        false
      );
    }

    applyCaching();

    if (tellSize) {
      tellSize({
        width: targetWidth,
        height: targetHeight,
      });
    }
    if (onLoadLayer && id) onLoadLayer(id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    frameSize,
    allowFit,
    width,
    height,
    x,
    y,
    tellSize,
    onChange,
    setImage,
    applyCaching,
  ]);

  const handleError = useCallback(
    (error) => {
      console.log("Failed to fetch image: ", error);
      if (onLoadLayer && id) onLoadLayer(id, true);
    },
    [onLoadLayer, id]
  );

  const setImgFromSVG = useCallback(
    async (src) => {
      try {
        let svgString = await urlToString(
          src + `?timestamp=${new Date().toISOString()}`
        );
        if (filterColor || stroke || strokeWidth) {
          svgString = replaceColors(svgString, {
            color: filterColor,
            stroke: stroke,
            strokeWidth: strokeWidth * strokeScale,
          });
        }

        loadImage(svgToURL(svgString), imageRef, handleLoad, handleError);
      } catch (error) {
        console.log("Failed to fetch image: ", error);
      }
    },
    [
      filterColor,
      imageRef,
      handleLoad,
      handleError,
      stroke,
      strokeWidth,
      strokeScale,
    ]
  );

  return [image, imageRef, applyCaching];
};
