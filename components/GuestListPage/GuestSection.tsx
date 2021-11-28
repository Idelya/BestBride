import React, { useContext, useEffect, useState } from "react";
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
import { Group, Guest } from "../../config/types";
import Search from "../Search";
import { ConstructionOutlined } from "@mui/icons-material";
import { GuestContext } from "./GuestContext";

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
  const [addGuest, setAddGuest] = useState<boolean>(false);
  const [addGroup, setAddGroup] = useState<boolean>(false);

  const { genderOptions, dietsOptions, statusOptions, setUpdate } =
    useContext(GuestContext);

  const {
    data: guests,
    mutate,
    error: errorGuests,
  } = useSWR("api/guest", fetcher) as {
    data: Guest[];
    mutate: any;
    error: any;
  };
  console.log(guests);
  const {
    data: groupsData,
    mutate: updateGroups,
    error: errorGroup,
  } = useSWR("api/group", fetcher) as {
    data: Group[];
    mutate: any;
    error: any;
  };

  const [filtredGuests, setFiltredGuests] = useState<Group[]>([
    {
      name: "all",
      guests: guests || [],
    },
  ]);
  const [searchGuests, setSearchGuests] = useState<Group[]>(filtredGuests);

  useEffect(() => {
    if (!addGuest) {
      mutate();
    }
  }, [mutate, addGuest]);

  useEffect(() => {
    if (!addGroup) {
      updateGroups(groupsData);
    }
  }, [updateGroups, addGroup, groupsData]);

  useEffect(() => {
    if (groups) {
      setFiltredGuests(groupsData);
    } else {
      setFiltredGuests([
        {
          name: "all",
          guests: guests || [],
        },
      ]);
    }
  }, [groups, groupsData, guests]);

  return (
    <section className={classes.main}>
      <GuestAdd
        open={addGuest}
        handleClose={() => {
          setAddGuest(false);
          setUpdate();
        }}
        guests={guests}
        genderOptions={genderOptions}
        dietsOptions={dietsOptions}
        statusOptions={statusOptions}
      />
      <GroupAdd
        open={addGroup}
        handleClose={() => setAddGroup(false)}
        guests={guests || []}
      />
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
        <ButtonGroup aria-label="switch to my list">
          <RectangularButton
            className={
              classes.btn + " " + (groups && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setGroups(false)}
          >
            Goście
          </RectangularButton>
          <RectangularButton
            className={
              classes.btn + " " + (!groups && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setGroups(true)}
          >
            Grupy
          </RectangularButton>
        </ButtonGroup>
      </div>
      <div className={classes.optionsBox}>
        <Filters
          handleChangeFilter={setFiltredGuests}
          handleChangeSearch={setSearchGuests}
          guests={[
            {
              name: "all",
              guests: guests || [],
            },
          ]}
          filtredGuests={filtredGuests}
        />
      </div>
      {groups ? (
        <GroupList
          addGroup={() => setAddGroup(true)}
          data={searchGuests || []}
          error={!!errorGuests}
          updateGuest={mutate}
          updateGroups={updateGroups}
        />
      ) : (
        <GuestList
          addGuest={() => setAddGuest(true)}
          data={searchGuests.map((group) => group.guests).flat() || []}
          error={!!errorGuests}
          update={() => {
            mutate();
            setUpdate();
          }}
        />
      )}
    </section>
  );
}
