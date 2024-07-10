import z from 'zod'

export const restaurantSchema = z.object({
    name:z.string().min(1,{message:"Name is required"}).max(50,{message:"Maximum 50 charecters allowed"}).regex(/^[A-Za-z].*/,{message:"Invalid name"}),
    description:z.string().min(1,{message:"Name is required"}).max(150,{message:"Maximum 150 charecters allowed"}),
    appartment:z.string().min(1,{message:"field is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    country:z.string().min(1,{message:"country is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    state:z.string().min(1,{message:"state is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    city:z.string().min(1,{message:"state is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    pincode:z.string().length(6,{message:"Invalid pincode"}),
    image:z.string()
})