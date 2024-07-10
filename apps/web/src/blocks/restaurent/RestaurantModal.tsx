import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "../../components/ui/alert-dialog"
  import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { addRestaurants, editRestaurant, toggleModal } from "../../redux/restaurants/restaurantSlice"
import { useFormik } from "formik"
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Input } from "../../components/ui/input"
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue } from "../../components/ui/select"
import z from 'zod'
import { State, City,IState, ICity }  from 'country-state-city';
import { RestaurantWithId } from "./Dashbord"
import { RestaurantType } from "@repo/validations"

const states:IState[] = State.getStatesOfCountry("IN")

// import restaurantSchema from "@repo/validations"

const restaurantSchema = z.object({
    name:z.string().min(1,{message:"Name is required"}).max(50,{message:"Maximum 50 charecters allowed"}).regex(/^[A-Za-z].*/,{message:"Invalid name"}),
    description:z.string().min(1,{message:"Name is required"}).max(150,{message:"Maximum 150 charecters allowed"}),
    appartment:z.string().min(1,{message:"field is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    country:z.string().min(1,{message:"country is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    state:z.string().min(1,{message:"state is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    city:z.string().min(1,{message:"state is required"}).max(50,{message:"Maximum 50 charecters allowed"}),
    pincode:z.string().length(6,{message:"Invalid pincode"}),
    image:z.string()
})

type Props = {
    formValues?:RestaurantWithId
}

export default function RestaurantModal({formValues}:Props) {
    const isOpen = useSelector((state:RootState)=>state.restaurants.isOpenModal)
    const initialValues = useSelector((state:RootState)=>state.restaurants.formInitialValues)
    const dispatch = useDispatch()

    let initalVals:RestaurantType = initialValues

    if(formValues){
        initalVals={
            appartment:formValues.appartment,
            city:formValues.city,
            country:formValues.country,
            description:formValues.description,
            image:formValues.image,
            name:formValues.name,
            pincode:formValues.pincode,
            state:formValues.state
        }
    }


    // useEffect(()=>{
    //     console.log(initialValues,'data45')
    //     setInitialVals(initialValues)
    // },[initialValues])
    // console.log(restaurantSchema)
    const formik = useFormik({
        initialValues:initalVals,
        enableReinitialize:true,
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            if(formValues){
                dispatch(editRestaurant({
                    ...values,
                    id:formValues.id,
                    
                }))
            }else{
                dispatch(addRestaurants(values))

            }
            dispatch(toggleModal(false))
            resetForm()
        },
        validationSchema:toFormikValidationSchema(restaurantSchema)
    })
    console.log(states,'data48')

    const getStateCode = (stateName:string)=>{
        const stateEle:IState | undefined = states.find((val)=>val.name==stateName)
        if(stateEle){
            return stateEle.isoCode

        }else{
            return ""
        }
    }
  return (
    <AlertDialog 
    open={isOpen}
    // open={true}
    >
        <AlertDialogContent className="max-h-[500px] overflow-y-auto">
            <form onSubmit={formik.handleSubmit}>

            
                <AlertDialogHeader>
                <AlertDialogTitle>Add Restaurant</AlertDialogTitle>
                    <div>
                        <Input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Restaurant name*" />
                        {formik.touched.name && formik.errors.name && <p className="text-red-600 text-sm ml-2">{formik.errors.name}</p>}
                    </div>
                    <div>
                        <Input value={formik.values.description} onChange={(e)=>{
                            console.log(formik.values,'data63')
                            formik.setFieldValue("description",e.target.value)
                        }} name="description" placeholder="Description*" />
                        {formik.touched.description && formik.errors.description && <p className="text-red-600 text-sm ml-2">{formik.errors.description}</p>}
                    </div>
                    <div>
                        <Input value={formik.values.appartment} onChange={formik.handleChange} name="appartment" placeholder="Appartment, Building name etc*" />
                        {formik.touched.appartment && formik.errors.appartment && <p className="text-red-600 text-sm ml-2">{formik.errors.appartment}</p>}
                    </div>
                    <div>
                        
                        <Select value={formik.values.state} name="state" onValueChange={(value)=>{
                            formik.setFieldValue("state",value)
                            formik.setFieldValue("city","")
                            }}>
                            <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Select State*" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>States Of India</SelectLabel>
                                    {states.map((stateEle:IState)=>{
                                        return <SelectItem key={stateEle.isoCode} value={stateEle.name}>{stateEle.name}</SelectItem>
                                    })}
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formik.touched.state && formik.errors.state && <p className="text-red-600 text-sm ml-2">{formik.errors.state}</p>}
                    </div>
                    <div>
                        <Select value={formik.values.city} name="city" onValueChange={(value)=>formik.setFieldValue("city",value)}>
                            <SelectTrigger disabled={formik.values.state?false:true} className="w-[100%]">
                                <SelectValue placeholder={formik.values.state?"Select City*":"Select State First"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cities of {formik.values.state && formik.values.state}</SelectLabel>
                                    {City.getCitiesOfState("IN", getStateCode(formik.values.state)).map((cityEle:ICity)=>{
                                        return <SelectItem key={cityEle.name} value={cityEle.name}>{cityEle.name}</SelectItem>
                                    })}
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {formik.touched.city && formik.errors.city && <p className="text-red-600 text-sm ml-2">{formik.errors.city}</p>}
                    </div>
                    <div>
                        <Input value={formik.values.pincode} onChange={(e)=>{
                            if(!isNaN(+e.target.value) && e.target.value.length<=6){
                                formik.setFieldValue("pincode",e.target.value)
                            }
                        }} name="pincode" placeholder="Pincode*" />
                        {formik.touched.pincode && formik.errors.pincode && <p className="text-red-600 text-sm ml-2">{formik.errors.pincode}</p>}
                    </div>
                    <div>
                        <Input value={formik.values.image} onChange={formik.handleChange} name="image" placeholder="Banner Image url*" />
                        {formik.touched.image && formik.errors.image && <p className="text-red-600 text-sm ml-2">{formik.errors.image}</p>}
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-3">
                <AlertDialogCancel onClick={()=>{
                    formik.resetForm()
                    dispatch(toggleModal(false))
                    }}>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    </AlertDialog>

  )
}
