import React from "react";
import styled from "styled-components/macro";

import { Box, TextField, Typography } from "@material-ui/core";

const TitleTypograhpy = styled(Typography)`
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
`;
const CustomeTextField = styled(TextField)`
  .MuiInputBase-input {
    height: 2rem;
  }
`;

const SizeProperty = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    touched,
    values,
  } = props;
  return (
    <Box display="flex" flexDirection="column">
      <TitleTypograhpy>Size</TitleTypograhpy>
      <CustomeTextField
        name="layer_data.width"
        label="Width"
        variant="outlined"
        type="number"
        value={values.layer_data.width}
        error={Boolean(
          touched.layer_data &&
            touched.layer_data.width &&
            errors.layer_data &&
            errors.layer_data.width
        )}
        helperText={
          touched.layer_data &&
          touched.layer_data.width &&
          errors.layer_data &&
          errors.layer_data.width
        }
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
        margin="normal"
        mb={4}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <CustomeTextField
        name="layer_data.height"
        label="Height"
        variant="outlined"
        type="number"
        value={values.layer_data.height}
        error={Boolean(
          touched.layer_data &&
            touched.layer_data.height &&
            errors.layer_data &&
            errors.layer_data.height
        )}
        helperText={
          touched.layer_data &&
          touched.layer_data.height &&
          errors.layer_data &&
          errors.layer_data.height
        }
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
        margin="normal"
        mb={4}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default SizeProperty;
