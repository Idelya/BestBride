import { EditorState } from "draft-js";
import React, { createContext } from "react";
import { ExpenseCategory, FullService, Option } from "../../config/types";

export const ServiceContext = createContext<{
  currentService?: FullService;
  categories?: ExpenseCategory[];
  mode: "view" | "edit";
  setService: (_newService: FullService) => void;
  profileImg?: File;
  setProfileImg: (_file: File) => void;
  gallery?: File[];
  setGallery: (_galleryImg: File[]) => void;
  editorState?: EditorState;
  setEditorState?: (_state: EditorState) => void;
  statusOptions?: Option[];
}>({
  currentService: undefined,
  setService: () => {},
  categories: undefined,
  mode: "view",
  profileImg: undefined,
  setProfileImg: (_file: any) => {},
  gallery: [],
  setGallery: (_: any) => {},
  editorState: undefined,
  setEditorState: (_: any) => {},
  statusOptions: [],
});
