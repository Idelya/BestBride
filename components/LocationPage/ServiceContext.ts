import { EditorState } from "draft-js";
import React, { createContext } from "react";
import { ExpenseCategory, Service } from "../../config/types";

export const ServiceContext = createContext<{
  currentService?: Service;
  categories?: ExpenseCategory[];
  mode: "view" | "edit";
  setService: (newService: Service) => void;
  profileImg?: File;
  setProfileImg: (profileImg: File) => void;
  editorState?: EditorState;
  setEditorState?: (state: EditorState) => void;
}>({
  currentService: undefined,
  setService: (newService) => {},
  categories: undefined,
  mode: "view",
  profileImg: undefined,
  setProfileImg: (file) => {},
  editorState: undefined,
  setEditorState: (_) => {},
});
