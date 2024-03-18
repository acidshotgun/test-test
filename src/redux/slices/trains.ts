import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ICharacteristict {
  speed: number;
  force: number;
  engineAmperage: number;
}

interface ITrain {
  name: string;
  description: string;
  characteristics: ICharacteristict[];
}

interface IState {
  trains: ITrain[] | null;
  status: string;
  selectedTrain: ITrain | null;
  validationError: boolean;
}

const initialState: IState = {
  trains: null,
  status: "idle",
  selectedTrain: null,
  validationError: false,
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
      state.selectedTrain =
        state.trains?.find((train) => train.name === trainName) ?? null;
    },
    clearSelectedTrain: (state) => {
      state.selectedTrain = null;
    },
    updateCharacteristics: (state, action) => {
      const { charIndex, charName, value } = action.payload;
      state.selectedTrain.characteristics[charIndex][charName] = value;
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

export const {
  selectTrainByName,
  clearSelectedTrain,
  updateCharacteristics,
  submitValues,
} = trainsSlice.actions;

export default trainsSlice.reducer;
