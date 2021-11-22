import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import request from "../../config/requests";
import axios from "axios";
import { List } from "@mui/material";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function AdminPanelPage() {
  const classes = useStyles();

  return (
    <div>
      <List></List>
    </div>
  );
}
