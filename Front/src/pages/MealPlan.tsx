import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'
import { MealPlan } from '../types/mealPlanTypes'
import { addMealPlan } from '../services/mealPlanService'
import Layout from '../Components/Layout/Layout'

const validationSchema = Yup.object({
  week: Yup.string().required('Week is required'),
  recipes: Yup.array()
    .of(
      Yup.object().shape({
        recipeId: Yup.string().required('Recipe ID is required'),
        day: Yup.mixed<DayEnum>()
          .oneOf(Object.values(DayEnum), 'Invalid day selected')
          .required('Day is required'),
        mealType: Yup.mixed<MealType>()
          .oneOf(Object.values(MealType), 'Invalid meal type selected')
          .required('Meal type is required'),
        recipeDetails: Yup.object().shape({
          title: Yup.string().required('Title is required'),
          image: Yup.string().url('Invalid image URL'),
          sourceUrl: Yup.string().url('Invalid source URL'),
        }),
      })
    )
    .required('At least one recipe is required'),
})

const initialValues: MealPlan = {
  userId: '',
  week: '',
  recipes: [
    {
      recipeId: '',
      day: '' as DayEnum,
      mealType: '' as MealType,
      recipeDetails: {
        title: '',
        image: '',
        sourceUrl: '',
      },
    },
  ],
}

const handleSubmit = async (
  values: MealPlan,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await addMealPlan(values)
    if (response.message) {
      console.log('Meal Plan added successfully:', values)
    } else {
      console.error('An error occurred while submitting the form')
    }
  } catch (error) {
    console.error('An error occurred while submitting the form', error)
  } finally {
    setSubmitting(false)
  }
}

export const MealPlans = () => {
  return <Layout>meal</Layout>
}
