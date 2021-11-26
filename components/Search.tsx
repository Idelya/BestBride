import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({
  handleChange,
  list,
}: {
  handleChange: (arr: any[]) => void;
  list: any[];
}) {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!!list) {
      handleChange(
        list.filter((obj: any) =>
          Object.values(obj)
            .flat()
            .some((v) =>
              `${v}`.toLowerCase().includes(`${search}`.toLowerCase())
            )
        )
      );
    }
  }, [search, list, handleChange]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(`${event.target.value}` || "");
  };

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "4px" }}>
      <TextField
        id="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{
          style: { backgroundColor: "white", borderRadius: "4px" },
        }}
        onChange={handleSearch}
        variant="outlined"
      />
    </Box>
  );
}
