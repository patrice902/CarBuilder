import { ImageWithLoad, Loader } from "components/common";
import { Box, useMediaQuery } from "components/MaterialUI";
import config from "config";
import React, { useCallback, useMemo, useState } from "react";

import {
  CustomImageList,
  CustomImageListItem,
  CustomInfiniteScroll,
} from "./common.style";

export const LogoContent = React.memo((props) => {
  const { step, logos, search, onOpen } = props;
  const [logoLimit, setLogoLimit] = useState(step);
  const isAboveMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const filteredLogos = useMemo(
    () =>
      logos.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.type !== "flag" &&
          item.active
      ),
    [logos, search]
  );

  const increaseLogoData = useCallback(() => {
    setLogoLimit(logoLimit + step);
  }, [logoLimit, step, setLogoLimit]);

  return (
    <Box
      id="logo-dialog-content"
      overflow="auto"
      height="min(700px, calc(100vh - 300px))"
    >
      <CustomInfiniteScroll
        dataLength={logoLimit} //This is important field to render the next data
        next={increaseLogoData}
        hasMore={logoLimit < filteredLogos.length}
        loader={<Loader />}
        scrollableTarget="logo-dialog-content"
      >
        <CustomImageList rowHeight="auto" cols={isAboveMobile ? 3 : 1} gap={10}>
          {filteredLogos.slice(0, logoLimit).map((logo) => (
            <CustomImageListItem
              key={logo.id}
              cols={1}
              onClick={() => onOpen(logo)}
            >
              <ImageWithLoad
                src={`${config.assetsURL}/${logo.preview_file}`}
                alt={logo.name}
                alignItems="center"
              />
            </CustomImageListItem>
          ))}
        </CustomImageList>
      </CustomInfiniteScroll>
    </Box>
  );
});
