import z from 'zod'
import { restaurantSchema } from './schema'
export default restaurantSchema

export const nameSchema = z.string()


export type RestaurantType = z.infer<typeof restaurantSchema>