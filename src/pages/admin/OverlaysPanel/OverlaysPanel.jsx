import { Box, Button, IconButton, Typography } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { ImageWithLoad, NoRowsOverlay } from "components/common";
import { ConfirmDialog } from "components/dialogs";
import config from "config";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOverlay, getOverlayList } from "redux/reducers/overlayReducer";

import { AddOverlayDialog } from "./AddOverlayDialog";
import { BigTooltip } from "./OverlaysPanel.style";
import { UpdateOverlayDialog } from "./UpdateOverlayDialog";

const OverlaysPanel = () => {
  const dispatch = useDispatch();
  const overlayList = useSelector((state) => state.overlayReducer.list);
  const loading = useSelector((state) => state.overlayReducer.loading);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [overlayIDToDelete, setOverlayIDToDelete] = useState();
  const [overlayToEdit, setOverlayToEdit] = useState();

  const handleEditClick = useCallback(
    (id) => {
      setOverlayToEdit(overlayList.find((item) => item.id === id));
    },
    [overlayList]
  );

  const handleShowDeleteConfirmation = useCallback((id) => {
    setOverlayIDToDelete(id);
  }, []);

  const handleDeleteClick = useCallback(() => {
    dispatch(deleteOverlay(overlayIDToDelete));
    handleShowDeleteConfirmation();
  }, [dispatch, handleShowDeleteConfirmation, overlayIDToDelete]);

  const handleAddClick = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const hideDeleteConfirmation = useCallback(
    () => setOverlayIDToDelete(null),
    []
  );

  const Toolbar = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      py={2}
      pr={2}
      borderBottom="1px solid rgb(81, 81, 81)"
    >
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleAddClick}>
        Add Graphic
      </Button>
      <AddOverlayDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
    </Box>
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <BigTooltip title={params.value}>
          <Typography style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </Typography>
        </BigTooltip>
      ),
    },
    {
      field: "overlay_file",
      headerName: "Origin",
      flex: 1,
      minWidth: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ImageWithLoad
          src={`${config.assetsURL}/${params.value}`}
          alt={params.getValue(params.id, "name")}
          alignItems="center"
          height={100}
        />
      ),
    },
    {
      field: "overlay_thumb",
      headerName: "Thumbnail",
      flex: 1,
      minWidth: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ImageWithLoad
          src={`${config.assetsURL}/${params.value}`}
          alt={params.getValue(params.id, "name")}
          alignItems="center"
          height={100}
        />
      ),
    },
    {
      field: "color",
      headerName: "Color",
      width: 120,
    },
    {
      field: "stroke_scale",
      headerName: "Stroke Scale",
      type: "number",
      width: 150,
    },
    {
      field: "legacy_mode",
      headerName: "Legacy",
      type: "boolean",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
      width: 100,
      renderCell: (params) => (
        <Box display="flex" gap={2}>
          <IconButton
            aria-label="edit"
            onClick={() => handleEditClick(params.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => setOverlayIDToDelete(params.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (!overlayList.length) dispatch(getOverlayList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" height="calc(100vh - 156px)">
      <DataGrid
        rows={overlayList}
        columns={columns}
        loading={loading}
        rowHeight={100}
        disableSelectionOnClick
        components={{
          Toolbar,
          NoRowsOverlay,
        }}
      />
      {overlayToEdit ? (
        <UpdateOverlayDialog
          open
          data={overlayToEdit}
          onClose={() => setOverlayToEdit(undefined)}
        />
      ) : (
        <></>
      )}
      <ConfirmDialog
        text={`Are you sure you want to delete this overlay?`}
        open={!!overlayIDToDelete}
        onCancel={hideDeleteConfirmation}
        onConfirm={handleDeleteClick}
      />
    </Box>
  );
};

export default OverlaysPanel;
