import React, { useRef, useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startCompanies.jpg";
import Logo from "../Logo";
import { flexbox } from "@mui/system";
import { Link, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";
import { Service } from "../../config/types";
import { EditorState, Editor, RichUtils, convertToRaw } from "draft-js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      textAlign: "center",
      padding: theme.spacing(5, 0),
    },
    editor: {
      height: "100%",
      border: "solid thin " + theme.palette.primary.main,
      minHeight: "300px",
    },
  })
);

export default function Offer({
  service,
  mode = "view",
}: {
  service: Service;
  mode?: "view" | "edit";
}) {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  function focusEditor() {
    //@ts-ignore
    editor.current.focus();
  }
  console.log(convertToRaw(editorState.getCurrentContent()).blocks);
  return (
    <div className={classes.content}>
      <div className={classes.editor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
}
