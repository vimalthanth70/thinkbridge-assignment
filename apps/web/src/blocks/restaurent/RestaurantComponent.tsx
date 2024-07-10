import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import {RestaurantWithId} from './Dashbord'
import { Button } from '../../components/ui/button'
import { useDispatch } from 'react-redux'
import {  deleteRestaurant, toggleModal } from '../../redux/restaurants/restaurantSlice'
import RestaurantModal from './RestaurantModal'
import { Toaster } from '../../components/ui/toaster'
import { useToast } from '../../components/ui/use-toast'

export default function RestaurantComponent() {
    const [restaurant,setRestarant] = useState<RestaurantWithId>()
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {toast} = useToast()
    const allRestaurants = useSelector((state:RootState)=>state.restaurants.restaurants)
    const restaurantIndex = allRestaurants.findIndex((record:RestaurantWithId)=>record.id==params.id)
    const error = useSelector((state:RootState)=>state.restaurants.resauranstError)
    useEffect(()=>{
        if(restaurantIndex == -1){
            console.log(restaurantIndex,'data12')
            navigate("/")
        }
        setRestarant(allRestaurants[restaurantIndex])

    },[allRestaurants])

    useEffect(()=>{
        if(error){
          
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error,
          })
        }
      },[error])
  return (
    <div className='flex h-[100%] min-h-[100vh] justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4'>
        <div className='max-w-[500px] mt-3'>
            <img className='w-[700px] object-cover' src={restaurant?.image} />
            <p className='text-[20px]'><span className='font-bold'>Restaurant Name : </span> {restaurant?.name}</p>
            <p className='text-[20px]'><span className='font-bold'>About Restaurant : </span>{restaurant?.description}</p>
            <p className='text-[20px]'><span className='font-bold'>Address : </span>{restaurant?.appartment},{restaurant?.city},{restaurant?.country}</p>
            <div className='flex gap-3 mt-4'>
                <Button variant="outline" onClick={()=>dispatch(toggleModal(true))}>Edit Restaurant</Button>
                <Button variant="destructive" onClick={()=>dispatch(deleteRestaurant(restaurant?.id))}>Delete Restaurant</Button>
            </div>
            <Button className='mt-3' onClick={()=>navigate("/")}>Go to Dashbord</Button>
        </div>
        <RestaurantModal formValues={restaurant} />
        <Toaster />
    </div>
  )
}
