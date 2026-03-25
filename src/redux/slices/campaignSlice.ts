import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CampaignState {
  campaigns: any[];
  currentCampaign: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCampaigns: (state, action: PayloadAction<any[]>) => {
      state.campaigns = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentCampaign: (state, action: PayloadAction<any>) => {
      state.currentCampaign = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setCampaigns, setCurrentCampaign, setError } = campaignSlice.actions;
export default campaignSlice.reducer;
