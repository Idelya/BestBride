import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Group } from "../../config/types";

export default function SearchInGroup({
  handleChange,
  list,
}: {
  handleChange: (arr: any[]) => void;
  list: Group[];
}) {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!!list) {
      handleChange(
        list.map((group) => {
          return {
            name: group.name,
            guests: group.guests.filter((obj: any) =>
              Object.values(obj)
                .flat()
                .some((v) =>
                  `${v}`.toLowerCase().includes(`${search}`.toLowerCase())
                )
            ),
          };
        })
      );
    }
  }, [search, list, handleChange]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(`${event.target.value}` || "");
  };

  return (
    <Box>
      <TextField
        id="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        variant="outlined"
      />
    </Box>
  );
}
