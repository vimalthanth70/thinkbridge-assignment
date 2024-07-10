import express,{Request,Response} from 'express'
import {RestaurantType} from "@repo/validations"
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

type IdType = {id:string}

type RestaurantWithId = RestaurantType & IdType

const allRestaurants:RestaurantWithId[] = [
    
]

app.get("/api/v1/restaurants",(req:Request,res:Response)=>{
    const search = req.query.search as string
    if(search){
        const filteredRecord = allRestaurants.filter((record)=>record.name.toLowerCase().includes(search.toLowerCase()) || record.city.toLowerCase().includes(search.toLowerCase()) || record.state.toLowerCase().includes(search.toLowerCase()))
        res.status(200).json({data:filteredRecord})
        return
    }
    res.status(200).json({data:allRestaurants})
})

app.post("/api/v1/restaurants",(req:Request,res:Response)=>{
    const data = req.body
    const index = allRestaurants.findIndex((rec)=>rec.name==data.name)
    if(index==-1){
        const newRecord = {...data,id:uuidv4()}
        allRestaurants.push(newRecord)
        res.status(201).json({data:newRecord})
    }else{
        res.status(400).json({error:"Already present"})

    }
})

app.put("/api/v1/restaurants",(req:Request,res:Response)=>{
    const data = req.body
    const index = allRestaurants.findIndex((rec)=>rec.id==data.id)
    allRestaurants.splice(index,1,data)
    res.status(200).json({data})
})

app.delete("/api/v1/restaurant/:id",(req:Request,res:Response)=>{
    const id = req.params.id
    const data = req.body
    const index = allRestaurants.findIndex((rec)=>rec.id==id)
    const record = allRestaurants[index]
    allRestaurants.splice(index,1)
    res.status(200).json({data:record})
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})