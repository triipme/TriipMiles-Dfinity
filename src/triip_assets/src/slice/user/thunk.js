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
export const spinResultsAPI = createAsyncThunk("/user/spinresults", async () => {
  const results = await store.getState().user.actor.listSpinResults();
  if (results?.ok) return results?.ok;
});
export const spinRemainingAPI = createAsyncThunk("/user/remaining-spin", async () => {
  const result = await store.getState().user.actor.remainingSpinTimes();
  return result;
});
