import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Link, Theme, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { stateToHTML } from "draft-js-export-html";
import { ServiceContext } from "./ServiceContext";

const Editor = dynamic(
  //@ts-ignore
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const init = "";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      textAlign: "center",
      padding: theme.spacing(5, 0),
    },
    editor: {
      height: "100%",
      minHeight: "300px",
    },
    editMode: {
      border: "solid thin " + theme.palette.primary.main,
    },
  })
);

export default function Offer() {
  const classes = useStyles();

  const { mode, currentService, setService, editorState, setEditorState } =
    useContext(ServiceContext);

  return (
    <div className={classes.content}>
      <div
        className={
          "editor " +
          classes.editor +
          " " +
          (mode === "edit" ? classes.editMode : "")
        }
      >
        <Editor
          //@ts-ignore
          editorState={editorState}
          readOnly={mode != "edit"}
          toolbarHidden={mode != "edit"}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "history",
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            image: { disabled: true },
          }}
        />
      </div>
    </div>
  );
}
