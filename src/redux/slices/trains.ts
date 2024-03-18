import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  trains: null,
  status: "idle",
  selectedTrain: null,
};

export const fetchTrainsData = createAsyncThunk(
  "trains/fetchTrains",
  async () => {
    const trainsData = await fetch(
      "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json"
    );
    return await trainsData.json();
  }
);

const trainsSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    selectTrainByName: (state, action) => {
      const trainName = action.payload;
      state.selectedTrain = state.trains.find(
        (train) => train.name === trainName
      );
    },
    clearSelectedTrain: (state) => {
      state.selectedTrain = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrainsData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrainsData.fulfilled, (state, { payload }) => {
      state.trains = payload;
      state.status = "idle";
    });
  },
});

export const { selectTrainByName, clearSelectedTrain, updateCellData } =
  trainsSlice.actions;

export default trainsSlice.reducer;
