import React, { ChangeEvent, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Box,
  Button,
  ButtonProps,
  Theme,
  IconButton,
} from "@mui/material";
import DecorationTypography from "./DecorationTypography";
import { createStyles, makeStyles, withThemeCreator } from "@mui/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: "none",
    },
  })
);

const UploadImage = ({
  onImageChange,
}: { onImageChange: (values: string, file: File) => void } & ButtonProps) => {
  const classes = useStyles();

  const handleOnClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const image = URL.createObjectURL(img);
      onImageChange(image, img);
    }
  };

  return (
    <label htmlFor="icon-button-file">
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        className={classes.hide}
        onChange={handleOnClick}
      />
      <IconButton component="span">
        <AddPhotoAlternateIcon />
      </IconButton>
    </label>
  );
};

export default UploadImage;
