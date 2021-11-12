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
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { stateToHTML } from "draft-js-export-html";

const Editor = dynamic(
  //@ts-ignore
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

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

export default function Offer({
  service,
  mode = "view",
}: {
  service: Service;
  mode?: "view" | "edit";
}) {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  console.log(convertToRaw(editorState.getCurrentContent()).blocks);
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
