import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchNasaphotos = createAsyncThunk(
    'photos/fetchphotos',
    async (earth_date,{getState}) =>{
        const existingPhotos=getState().photos.data[earth_date];
        if (existingPhotos) return { date: earth_date, photos: existingPhotos };


        const API_KEY="0iRTSSIHF6RmmtNKSipR4GdBUUnxN3CDr9QVbfuQ";
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${API_KEY}`);
        const data=await response.json();
        return { date : earth_date , photos : data.photos};
    }
);

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        savedPhotos: [],
        data:{},
        loading:false,
        error:null,
    },
    reducers: {
        addPhoto: (state, action) => {
            state.savedPhotos.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchNasaphotos.pending, (state) => { state.loading = true; })
          .addCase(fetchNasaphotos.fulfilled, (state, action) => {
            state.loading = false;
            state.data[action.payload.date] = action.payload.photos;
          })
          .addCase(fetchNasaphotos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
});

export const { addPhoto } = photosSlice.actions;
export default photosSlice.reducer;