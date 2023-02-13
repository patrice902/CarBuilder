import { ProjectItem, ScreenLoader } from "components/common";
import { Box, Grid, Typography } from "components/MaterialUI";
import { scrollBackOnProjectList } from "helper";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router";
import styled from "styled-components/macro";

const CustomInfiniteScroll = styled(InfiniteScroll)`
  &.infinite-scroll-component {
    overflow: hidden !important;
  }
`;

export const MyProjects = React.memo((props) => {
  const {
    user,
    schemeList,
    favoriteSchemeList,
    sortBy,
    search,
    selectedVehicle,
    hideLegacy,
    onDeleteProject,
    onCloneProject,
    onRemoveFavorite,
    onAddFavorite,
  } = props;

  const history = useHistory();
  const step = 15;
  const [limit, setLimit] = useState(step);

  const filteredSchemeList = useMemo(
    () =>
      _.orderBy(
        schemeList.filter(
          (item) =>
            (item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.carMake.name.toLowerCase().includes(search.toLowerCase())) &&
            (!selectedVehicle || selectedVehicle.id === item.carMake.id) &&
            (!hideLegacy || !item.legacy_mode) &&
            !item.carMake.deleted
        ),
        sortBy === 1
          ? ["name"]
          : sortBy === 2
          ? ["carMake.name"]
          : ["date_modified"],
        sortBy === 1 ? ["asc"] : sortBy === 2 ? ["asc"] : ["desc"]
      ),
    [schemeList, search, selectedVehicle, sortBy, hideLegacy]
  );

  const openScheme = useCallback(
    (schemeID) => {
      history.push(`/project/${schemeID}`);
    },
    [history]
  );

  const increaseData = () => {
    setLimit(limit + step);
  };

  useEffect(() => {
    setTimeout(scrollBackOnProjectList, 500);
  }, []);

  return (
    <>
      {filteredSchemeList.length ? (
        <CustomInfiniteScroll
          dataLength={limit} //This is important field to render the next data
          next={increaseData}
          hasMore={limit < filteredSchemeList.length}
          loader={<ScreenLoader />}
          scrollableTarget="scheme-list-content"
        >
          <Grid container spacing={4}>
            {filteredSchemeList.slice(0, limit).map((scheme) => {
              const favroiteScheme = favoriteSchemeList.find(
                (item) => item.scheme_id === scheme.id
              );
              return (
                <Grid key={scheme.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <ProjectItem
                    user={user}
                    isFavorite={!!favroiteScheme}
                    scheme={scheme}
                    favoriteID={favroiteScheme ? favroiteScheme.id : null}
                    onDelete={onDeleteProject}
                    onOpenScheme={openScheme}
                    onCloneProject={onCloneProject}
                    onRemoveFavorite={onRemoveFavorite}
                    onAddFavorite={onAddFavorite}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomInfiniteScroll>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="min(500px, 50vh)"
          flexGrow={1}
        >
          <Typography variant="h2">No Projects</Typography>
        </Box>
      )}
    </>
  );
});

export default MyProjects;
