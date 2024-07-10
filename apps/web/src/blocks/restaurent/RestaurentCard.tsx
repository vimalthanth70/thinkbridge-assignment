import { RestaurantType } from "@repo/validations";
import {useNavigate} from 'react-router-dom'

type IdType = {id:string}

    type RestaurantWithId = RestaurantType & IdType


export default function RestaurentCard({cardDetail}:{cardDetail:RestaurantWithId}) {
  const navigate = useNavigate()
    
  return (
    <div className="w-[300px] border-[1px] rounded-xl cursor-pointer bg-white" onClick={()=>navigate(`/restaurant/${cardDetail.id}`)}>
        <img className="h-[150px] rounded-xl w-[100%] object-cover" src={cardDetail.image} />
        <div className="p-2">
            <div className="text-[20px] w-[90%] whitespace-nowrap overflow-hidden text-ellipsis font-bold">{cardDetail.name}</div>
            <div className="text-[rgba(2, 6, 12, 0.6)] capitalize">{cardDetail.appartment},{cardDetail.city},{cardDetail.state}</div>

        </div>

    </div>
  )
}
