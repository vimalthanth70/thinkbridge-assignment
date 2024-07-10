import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RestaurantType} from '@repo/validations'

// const fetchRestaurants = createAsyncThunk()
export const fetchRestaurants:any = createAsyncThunk('fetchAllProducts', async ({query}:{query:string}, thunkAPI) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/restaurants?search=${query}`,{
        method:"GET",
        headers:{
          "Content-Type":"Application/json"
        //   "x-api-key":import.meta.env.VITE_APP_KEY
        }
      });
      const data = await response.json()
      return data.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
export const addRestaurants:any = createAsyncThunk('addRestaurants', async (restaurantData:RestaurantType, thunkAPI) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/restaurants`,{
        method:"POST",
        headers:{
          "Content-Type":"Application/json"
        //   "x-api-key":import.meta.env.VITE_APP_KEY
        },
        body:JSON.stringify(restaurantData)
      });
      const data = await response.json()
      if(response.status==400){
        throw new Error(data.error)
      }
      return data.data;
    } catch (error:any) {
      console.log(error.message,'data35')
      if(error.message=="Already present"){
        return thunkAPI.rejectWithValue(error);
      }
      const serverError = new Error("Something is up with our server")
      return thunkAPI.rejectWithValue(serverError);
    }
  });
export const editRestaurant:any = createAsyncThunk('editRestaurant', async (restaurantData:RestaurantWithId, thunkAPI) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/restaurants`,{
        method:"PUT",
        headers:{
          "Content-Type":"Application/json"
        //   "x-api-key":import.meta.env.VITE_APP_KEY
        },
        body:JSON.stringify(restaurantData)
      });
      const data = await response.json()
      if(response.status==400){
        throw new Error(data.error)
      }
      return data.data;
    } catch (error:any) {
      console.log(error.message,'data35')
      if(error.message=="Already present"){
        return thunkAPI.rejectWithValue(error);
      }
      const serverError = new Error("Something is up with our server")
      return thunkAPI.rejectWithValue(serverError);
    }
  });
export const deleteRestaurant:any = createAsyncThunk('deleteRestaurant', async (id:string, thunkAPI) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/restaurant/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"Application/json"
        },
      });
      const data = await response.json()
      if(response.status==404){
        throw new Error(data.error)
      }
      return data.data;
    } catch (error:any) {
      console.log(error.message,'data35')
      if(error.message=="Record not found"){
        return thunkAPI.rejectWithValue(error);
      }
      const serverError = new Error("Something is up with our server")
      return thunkAPI.rejectWithValue(serverError);
    }
  });

  type IdType = {id:string}

    type RestaurantWithId = RestaurantType & IdType

  type InitialState = {
    restaurants:RestaurantWithId[],
    loading:boolean,
    resauranstError:string,
    isOpenModal:boolean,
    formInitialValues:RestaurantType,
    editId:string
  }

  const initialState:InitialState = {
    restaurants:[],
    loading:false,
    resauranstError:'',
    isOpenModal:false,
    editId:"",
    formInitialValues:{
        name: "",
        description: "",
        appartment: "",
        country: "India",
        state: "",
        city: "",
        pincode: "",
        image: ""

    }
  }
  

export const restaurantSlice = createSlice({
    name:"restaurants",
    initialState:initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<boolean>)=>{
            state.isOpenModal=action.payload
        },
        resetFormInitialValues:(state)=>{
          state.formInitialValues = {
            name: "",
            description: "",
            appartment: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            image: ""
    
          }
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRestaurants.pending, (state) => {
            state.loading = true;
            state.resauranstError = "";
          })
          .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<RestaurantWithId[]>) => {
            state.loading = false;
            if(action.payload){
                state.restaurants = [...action.payload];
                }else{
                state.restaurants = [];

            }
          })
          .addCase(fetchRestaurants.rejected, (state, action) => {
            state.loading = false;
            state.resauranstError = action.payload as string;
          })
          .addCase(addRestaurants.pending, (state) => {
            state.loading = true;
            state.resauranstError = "";
          })
          .addCase(addRestaurants.fulfilled, (state, action: PayloadAction<RestaurantWithId>) => {
            state.loading = false;
            if(action.payload){
                state.restaurants = [...state.restaurants,action.payload];
                }
          })
          .addCase(addRestaurants.rejected, (state, action) => {
            console.log(action,'data126')
            state.loading = false;
            state.resauranstError = action.payload.message as string;
          })
          .addCase(editRestaurant.pending, (state) => {
            state.loading = true;
            state.resauranstError = "";
          })
          .addCase(editRestaurant.fulfilled, (state, action: PayloadAction<RestaurantWithId>) => {
            state.loading = false;
            if(action.payload){
              const allRestaurants = [...state.restaurants]
              const index = allRestaurants.findIndex((record)=>record.id==action.payload.id)
              allRestaurants.splice(index,1,action.payload)
                state.restaurants = [...allRestaurants];
                }
          })
          .addCase(editRestaurant.rejected, (state, action) => {
            console.log(action,'data126')
            state.loading = false;
            state.resauranstError = action.payload.message as string;
          })
          .addCase(deleteRestaurant.pending, (state) => {
            state.loading = true;
            state.resauranstError = "";
          })
          .addCase(deleteRestaurant.fulfilled, (state, action: PayloadAction<RestaurantWithId>) => {
            state.loading = false;
            if(action.payload){
              const allRestaurants = [...state.restaurants]
              const index = allRestaurants.findIndex((record)=>record.id==action.payload.id)
              allRestaurants.splice(index,1)
                state.restaurants = [...allRestaurants];
                }
          })
          .addCase(deleteRestaurant.rejected, (state, action) => {
            console.log(action,'data126')
            state.loading = false;
            state.resauranstError = action.payload.message as string;
          })
      },

})

export const {
    toggleModal,
} = restaurantSlice.actions

export default restaurantSlice.reducer