import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../index";

export const tranvelPlansAPI = createAsyncThunk("/user/travelplans", async () => {
  const tps = await store.getState().user.actor.readAllTPUser();
  if (tps?.ok) return tps?.ok;
});
export const storageAPI = createAsyncThunk("/user/storage", async () => {
  const storage = await store.getState().user.actor.storage();
  if (storage?.ok) return storage?.ok;
});
