import React, { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Theme,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  ListItemText,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import { ROUTES, USER_MENU } from "../../config/configNav";
import NavLink from "./NavLink";
import RectangularButton from "../RectangularButton";
import { useDispatch, useSelector } from "react-redux";
import { OurStore } from "../../store/store";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";
import { AuthStates, logout } from "../../store/slices/auth";
import { ROLE } from "../../config/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
    },
  })
);

export default function Account() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpClient, signInClient } = ROUTES;
  const { me } = useSelector((state: OurStore) => state.authReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      {!me && (
        <>
          <NavLink route={signUpClient} />
          <Link href={signInClient.link} passHref>
            <RectangularButton
              color="primary"
              variant="outlined"
              size="medium"
              className={classes.root}
            >
              {signInClient.name}
            </RectangularButton>
          </Link>
        </>
      )}
      {!!me && (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Jesteś zalogowany">
              <Button
                onClick={handleClick}
                startIcon={<Avatar src={me.photo} />}
                className={classes.root}
                size="small"
                sx={{ ml: 2 }}
              >
                {me.name || me.email}
              </Button>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {me?.role === ROLE.USER &&
              USER_MENU.map((e, i) => (
                <Link href={e.link} key={i} passHref>
                  <MenuItem>{e.name}</MenuItem>
                </Link>
              ))}
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Wyloguj</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
}
