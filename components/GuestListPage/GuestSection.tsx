import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, ButtonGroup, Theme } from "@mui/material";
import Divider from "../Divider";
import AddIcon from "@mui/icons-material/Add";
import RectangularButton from "../RectangularButton";
import Filters from "./Filters";
import GuestList from "./GuestList";
import GuestAdd from "./GuestAdd";
import GroupAdd from "./GroupAdd";
import GroupList from "./GroupList";
import useSWR from "swr";
import axios from "axios";
import { Guest } from "../../config/types";
import Search from "../Search";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function GuestSection() {
  const classes = useStyles();

  const [groups, setGroups] = useState<boolean>(false);
  const [smallList, setSmallList] = useState<boolean>(false);
  const [addGuest, setAddGuest] = useState<boolean>(false);
  const [addGroup, setAddGroup] = useState<boolean>(false);

  const {
    data: guests,
    mutate,
    error: errorGuests,
  } = useSWR("api/guest", fetcher) as {
    data: Guest[];
    mutate: any;
    error: any;
  };

  const [filtredGuests, setFiltredGuests] = useState<Guest[]>(guests);
  const [searchGuests, setSearchGuests] = useState<Guest[]>(filtredGuests);

  useEffect(() => {
    if (!addGuest) {
      mutate();
    }
  }, [mutate, addGuest]);

  useEffect(() => {
    setFiltredGuests(guests);
  }, [guests]);

  console.log(searchGuests);

  return (
    <section className={classes.main}>
      <GuestAdd
        open={addGuest}
        handleClose={() => setAddGuest(false)}
        guests={guests}
      />
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
      <div className={classes.optionsBox}>
        <Filters
          handleChangeFilter={setFiltredGuests}
          handleChangeSearch={setSearchGuests}
          guests={guests}
          filtredGuests={filtredGuests}
          searchGuests={searchGuests}
        />
      </div>
      {groups ? (
        <GroupList addGroup={() => setAddGroup(true)} />
      ) : (
        <GuestList
          addGuest={() => setAddGuest(true)}
          data={searchGuests}
          error={!!errorGuests}
        />
      )}
    </section>
  );
}
