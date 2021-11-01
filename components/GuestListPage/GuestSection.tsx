import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Divider from "../Divider";
import AddIcon from "@mui/icons-material/Add";
import useToggle from "../../utils/useToggle";
import RectangularButton from "../RectangularButton";
import Filters from "./Filters";
import GuestList from "./GuestList";
import GuestAdd from "./GuestAdd";
import GroupAdd from "./GroupAdd";
import GroupList from "./GroupList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {},
    btn: {
      textTransform: "none",
    },
    btnInactive: {
      color: theme.palette.grey[500],
    },
    btnInactiveWithBorder: {
      color: theme.palette.grey[500],
      borderColor: theme.palette.grey[500],
      boxShadow: "none",
    },
    optionsBox: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(5, 15, 2, 0),
    },
  })
);

export default function GuestSection() {
  const classes = useStyles();

  const [groups, setGroups] = useState<boolean>(false);
  const [smallList, setSmallList] = useState<boolean>(false);
  const [addGuest, setAddGuest] = useState<boolean>(false);
  const [addGroup, setAddGroup] = useState<boolean>(false);

  return (
    <section className={classes.main}>
      <GuestAdd open={addGuest} handleClose={() => setAddGuest(false)} />
      <GroupAdd open={addGroup} handleClose={() => setAddGroup(false)} />
      <Divider component="h2" textAlign="right">
        Lista gości
      </Divider>
      <div className={classes.optionsBox}>
        <div>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setAddGuest(true)}
            className={classes.btn}
            size="large"
          >
            Dodaj gościa
          </Button>
          {groups && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setAddGroup(true)}
              className={classes.btn}
              sx={{ position: "absolute" }}
              size="large"
            >
              Dodaj grupę
            </Button>
          )}
        </div>
        <ButtonGroup variant="text" aria-label="switch to group">
          <Button
            className={classes.btn + " " + (groups && classes.btnInactive)}
            onClick={() => setGroups(false)}
          >
            Goście
          </Button>
          <Button
            className={classes.btn + " " + (!groups && classes.btnInactive)}
            onClick={() => setGroups(true)}
          >
            Grupy
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="switch to my list">
          <RectangularButton
            className={
              classes.btn + " " + (smallList && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setSmallList(false)}
          >
            Wszyscy goście
          </RectangularButton>
          <RectangularButton
            className={
              classes.btn + " " + (!smallList && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setSmallList(true)}
          >
            Moja lista gości
          </RectangularButton>
        </ButtonGroup>
      </div>
      <Filters />
      {groups ? (
        <GroupList addGroup={() => setAddGroup(true)} />
      ) : (
        <GuestList addGuest={() => setAddGuest(true)} update={addGuest} />
      )}
    </section>
  );
}
