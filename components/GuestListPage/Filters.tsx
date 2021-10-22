import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme, Typography, Collapse, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandButton: {
      transform: "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expanded: {
      transform: "rotate(0deg)",
    },
    btn: {
      textTransform: "none",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  })
);

export default function Filters() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Button disableRipple onClick={handleExpandClick} className={classes.btn}>
        <Typography>Filtry</Typography>
        <ExpandMoreIcon
          className={
            classes.expandButton + " " + (expanded && classes.expanded)
          }
        />
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography>Więcej filtrów</Typography>
      </Collapse>
    </div>
  );
}
