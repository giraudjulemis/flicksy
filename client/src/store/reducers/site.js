import { createSlice } from "@reduxjs/toolkit";

export const siteSlice = createSlice({
  name: "site",
  initialState: {
    layout: "",
  },
});

export default siteSlice.reducer;
