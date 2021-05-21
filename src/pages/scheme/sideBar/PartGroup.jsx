import React, { useEffect, useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { ReactSortable } from "react-sortablejs";
import { spacing } from "@material-ui/system";

import { MouseModes } from "constant";
import {
  updateLayer,
  setCurrent as setCurrentLayer,
  setHoveredJSONItem,
} from "redux/reducers/layerReducer";
import { setMouseMode } from "redux/reducers/boardReducer";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  IconButton,
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
} from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { makeStyles } from "@material-ui/core/styles";
import PartItem from "./PartItem";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Button = styled(MuiButton)(spacing);
const ButtonGroup = styled(MuiButtonGroup)(spacing);
const AddButton = styled(Button)`
  min-width: 40px;
  padding: 3px 5px;
  .MuiButton-startIcon {
    margin-right: 2px;
  }
  .MuiButton-endIcon {
    margin: 0;
  }
  .fa-lg {
    font-size: 1.3333333333em !important;
  }
`;
const CustomCardHeader = styled(CardHeader)`
  .MuiCardHeader-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .MuiCardHeader-content {
    width: calc(100% - 50px);
  }
`;

const PartGroup = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const currentLayer = useSelector((state) => state.layerReducer.current);
  const hoveredJSON = useSelector((state) => state.layerReducer.hoveredJSON);
  const {
    layerList,
    title,
    actions,
    extraChildren,
    disableLock,
    disableDnd,
  } = props;
  const sortedList = _.orderBy(layerList, ["layer_order"], ["asc"]);

  useEffect(() => {
    for (let index in sortedList) {
      if (sortedList[index].layer_order !== parseInt(index) + 1) {
        dispatch(
          updateLayer(
            {
              ...sortedList[index],
              layer_order: parseInt(index) + 1,
            },
            false
          )
        );
      }
    }
  }, [layerList.length]);

  const handleExpandClick = () => {
    setExpanded((preValue) => !preValue);
  };
  const handleChangeLayer = (list) => {
    for (let index in list) {
      const layer = layerList.find((item) => item.id == list[index].id);
      if (layer && layer.layer_order !== parseInt(index) + 1) {
        dispatch(
          updateLayer(
            {
              ...layer,
              layer_order: parseInt(index) + 1,
            },
            false
          )
        );
      }
    }
  };
  const toggleField = (id, field) => {
    const layer = layerList.find((item) => item.id === id);
    dispatch(
      updateLayer({
        ...layer,
        [field]: layer[field] ? 0 : 1,
      })
    );
  };
  const selectLayer = (layer) => {
    dispatch(setCurrentLayer(layer));
    dispatch(setMouseMode(MouseModes.DEFAULT));
  };
  const hoverLayer = (layer, flag) => {
    dispatch(setHoveredJSONItem({ key: layer.id, value: flag }));
  };

  return (
    <Box mb={2}>
      <Card>
        <CustomCardHeader
          title={title}
          action={
            <Box display="flex">
              {actions ? (
                <ButtonGroup mr={1}>
                  {actions.map((action, index) => (
                    <AddButton
                      key={index}
                      onClick={action.onClick}
                      size="small"
                      startIcon={<AddIcon />}
                      endIcon={<FontAwesomeIcon icon={action.icon} size="lg" />}
                      variant="outlined"
                    ></AddButton>
                  ))}
                </ButtonGroup>
              ) : (
                <></>
              )}
              <IconButton
                onClick={handleExpandClick}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          }
        />
        <Collapse in={expanded}>
          <CardContent>
            <ReactSortable
              list={sortedList}
              setList={handleChangeLayer}
              animation={150}
              onChoose={(evt) => console.log(evt)}
              onSelect={(evt) => console.log(evt)}
              sort={!disableDnd}
            >
              {sortedList.map((item) => (
                <PartItem
                  text={item.layer_data.name}
                  layer_visible={item.layer_visible}
                  layer_locked={item.layer_locked}
                  key={item.id}
                  toggleVisible={() => toggleField(item.id, "layer_visible")}
                  toggleLocked={() => toggleField(item.id, "layer_locked")}
                  selected={currentLayer && currentLayer.id === item.id}
                  hovered={hoveredJSON[item.id]}
                  onSelect={() => selectLayer(item)}
                  onHover={(flag) => hoverLayer(item, flag)}
                  disableLock={disableLock}
                />
              ))}
            </ReactSortable>
            {extraChildren}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default PartGroup;
