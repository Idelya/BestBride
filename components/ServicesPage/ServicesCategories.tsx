import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Card,
  Button,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Theme,
  Typography,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Divider from "../Divider";
import { number } from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Service } from "../../config/types";
import Loading from "../Loading";
import { ServicesContext } from "./ServicesContext";
import Search from "../Search";
import ServicesList from "./ServicesList";
import { TreeView, TreeItem } from "@mui/lab";
import { getValueFromExpenseCategory } from "../../config/helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(-20),
      minHeight: "100vh",
    },
    grid: {
      marginTop: theme.spacing(2),
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.9)",
      height: "200px",
    },
    content: {
      width: "100%",
      height: "100%",
      margin: "auto",
      backgroundColor: "rgba(255,255,255,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    status: {
      position: "absolute",
      height: "18%",
      width: "100%",
      bottom: 0,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
    },
    background: {
      backgroundColor: "#F8F8F8",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    btn: {
      textDecoration: "none",
      "& *": {
        textDecoration: "none",
      },
    },
    search: {
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      minHeight: "50px",
    },
    filters: {
      padding: theme.spacing(3, 1),
    },
  })
);

const servicesMock = [
  {
    id: 1,
    name: "Usługa",
    category: 1,
    fileLink:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
  },
];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function ServicesCategories({
  currentCategory,
  setCurrentCategory,
}: {
  currentCategory: number | null;
  setCurrentCategory: (cat: number) => void;
}) {
  const classes = useStyles();
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [filtredList, setFiltredList] = useState<Service[]>([]);
  const { expenseOptions } = useContext(ServicesContext);

  const { data: locations } = useSWR("/api/locations", fetcher) as {
    data: Service[];
  };
  console.log(locations);

  useEffect(() => {
    setServicesList(locations);
  }, [locations]);

  if (!expenseOptions || !locations) {
    return (
      <Container sx={{ display: "flex" }}>
        <Loading />
      </Container>
    );
  }
  return (
    <Container className={classes.container}>
      <div className={classes.search}>
        {currentCategory != null && (
          <Search handleChange={setServicesList} list={locations || []} />
        )}
      </div>
      <Grid
        container
        spacing={currentCategory != null ? 8 : 4}
        className={classes.grid}
      >
        {currentCategory != null ? (
          <>
            <Grid item md={3}>
              <Paper className={classes.filters}>
                <Typography>Kategorie</Typography>
                <TreeView
                  sx={{
                    height: 240,
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "auto",
                  }}
                >
                  {expenseOptions.map((cat) => (
                    <TreeItem
                      key={cat.id}
                      nodeId={cat.id.toString()}
                      label={cat.name}
                      onClick={() => setCurrentCategory(cat.id)}
                    />
                  ))}
                </TreeView>
              </Paper>
            </Grid>
            <Grid item md={9}>
              <ServicesList list={servicesList} />
            </Grid>
          </>
        ) : (
          expenseOptions.map((cat) => (
            <Grid item md={4} key={cat.id}>
              <Card className={classes.card}>
                <CardActionArea
                  onClick={() => setCurrentCategory(cat.id)}
                  className={classes.content}
                >
                  <CardContent>
                    <Typography color="primary" variant="h5">
                      {cat.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
