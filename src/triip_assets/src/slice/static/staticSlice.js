import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travelplan: {
    activities: [
      "Beach & Sun",
      " Spa - Relax",
      " Adventure",
      " Art & Culture",
      " Food & Beverage",
      " Family & Friend",
      " Backpacker",
      " Budget",
      " Business",
      " Green",
      " History",
      " LGBT",
      " Luxury",
      " Nightlife",
      " Romantic",
      " Spiritual",
      " Student",
      " Trendsetter",
      " Vegetarian",
      " Photography",
      " Startup",
      " GTEC",
      " MTEC"
    ],
    join_type: ["Solo", "Couple", "Family", "Group"],
    destination: []
  }
};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {
    destinationReducer: (state, action) => {
      return {
        travelplan: {
          ...state.travelplan,
          destination: action.payload
        }
      };
    }
  }
});

export const { destinationReducer } = staticSlice.actions;
export default staticSlice.reducer;
