import RestaurentCard from "./RestaurentCard";
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {fetchRestaurants} from "../../redux/restaurants/restaurantSlice"
import { RootState } from '../../redux/store'
import { RestaurantType } from "@repo/validations";
import {toggleModal} from '../../redux/restaurants/restaurantSlice'
import RestaurantModal from "./RestaurantModal";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Input } from "../../components/ui/input";
import { ErrorBoundary } from "../common/ErrorBoundry";
type IdType = {id:string}

    export type RestaurantWithId = RestaurantType & IdType
    let timer:any;
export default function Dashbord() {
    // console.log(nameSchema)
    const dispatch  = useDispatch()
    const {toast} = useToast()
    const allRestaurants = useSelector((state:RootState)=>state.restaurants)
    const error = useSelector((state:RootState)=>state.restaurants.resauranstError)
    console.log(error,'data18')
    console.log(allRestaurants.restaurants,'data12')
    useEffect(()=>{
      
        dispatch(fetchRestaurants({query:""}))
    },[])

    useEffect(()=>{
      if(error){
        
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        })
      }
    },[error])

    const handleSearchChange = (query:string)=>{
      if(timer)clearTimeout(timer)
        timer = setTimeout(()=>{
          console.log(query,'data44')
          dispatch(fetchRestaurants({query}))
      },500)
    }
  return (
    <div className="p-4 min-h-[100vh]">
      <div className="w-[100%] flex justify-end px-[10%] mb-3 gap-3">
        <Input onChange={(e)=>handleSearchChange(e.target.value)} placeholder="Search restaurant by name or lacation.." />
        <Button onClick={()=>dispatch(toggleModal(true))}>Add Restaurant</Button>
      </div>
        <div className="flex w-[100%] justify-start right-3">
          <ErrorBoundary>
            <div className="flex flex-wrap justify-center gap-5">
              {allRestaurants.restaurants.length>0 && allRestaurants.restaurants.map((restuarant:RestaurantWithId)=>{
                  return <RestaurentCard key={restuarant.id} cardDetail={restuarant} /> 
              })}

            </div>

          </ErrorBoundary>

        </div>
        {allRestaurants.restaurants.length==0 && <p className="text-center font-bold text-[20px]">No Restaurant found!</p>}
        <RestaurantModal />
        <Toaster />
    </div>
  )
}
