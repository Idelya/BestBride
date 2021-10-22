import React from "react";
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
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import { ROUTES, USER_MENU } from "../../config/configNav";
import NavLink from "./NavLink";
import RectangularButton from "../RectangularButton";
import { useSelector } from "react-redux";
import { OurStore } from "../../store/store";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";

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
      {me && (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Jesteś zalogowany">
              <Button
                onClick={handleClick}
                startIcon={<Avatar />}
                className={classes.root}
                size="small"
                sx={{ ml: 2 }}
              >
                {me.email}
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
            {USER_MENU.map((e, i) => (
              <Link href={e.link} key={i} passHref>
                <MenuItem>{e.name}</MenuItem>
              </Link>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}
