import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  userId: string | null;
  batchId: number | null;
  departmentId: number | null;
  profile: {
    name: string;
    email: string;
    crn: number;
    phone: string;
    batch: {
      id: number;
      name: string;
      startYear: number;
      endYear: number;
      department: {
        id: number;
        name: string;
      };
    };
  } | null;
}

const initialState: ProfileState = {
  userId: null,
  batchId: null,
  departmentId: null,
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
    setBatchId(state, action: PayloadAction<number | null>) {
      state.batchId = action.payload;
    },
    setDepartmentId(state, action: PayloadAction<number | null>) {
      state.departmentId = action.payload;
    },
    setProfile(state, action: PayloadAction<ProfileState['profile']>) {
      state.profile = action.payload;
    },
  },
});

export const { setUserId, setBatchId, setDepartmentId, setProfile } = profileSlice.actions;

export default profileSlice.reducer;
