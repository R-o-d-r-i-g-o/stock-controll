import * as React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <CircularProgress color="inherit" />
  </div>
);

export { Loader };
