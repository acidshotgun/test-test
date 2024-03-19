import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ICharacteristict {
  speed: number;
  force: number;
  engineAmperage: number;
}

export interface ITrain {
  name: string;
  description: string;
  characteristics: ICharacteristict[];
}

export interface IState {
  trains: ITrain[] | null;
  status: string;
  selectedTrain: ITrain | null;
  errors: string[];
}

interface UpdateCharacteristicsPayload {
  charIndex: number;
  charName: keyof ICharacteristict;
  value: number;
}

const initialState: IState = {
  trains: null,
  status: "idle",
  selectedTrain: null,
  errors: [],
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
    updateCharacteristics: (
      state,
      action: PayloadAction<UpdateCharacteristicsPayload>
    ) => {
      const { charIndex, charName, value } = action.payload;

      if (!state.selectedTrain) return;

      state.selectedTrain.characteristics[charIndex][charName] = +value;
    },
    addErrors: (state, action) => {
      const newError = action.payload;
      const isDuplicate = state.errors.some((error) => error === newError);
      if (!isDuplicate) {
        state.errors.push(newError);
      }
    },
    removeError: (state, action) => {
      const errorToRemove = action.payload;
      state.errors = state.errors.filter((error) => error !== errorToRemove);
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
  addErrors,
  removeError,
} = trainsSlice.actions;

export default trainsSlice.reducer;
