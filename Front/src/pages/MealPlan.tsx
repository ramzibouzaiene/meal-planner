import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'
import { MealPlan } from '../types/mealPlanTypes'
import { addMealPlan } from '../services/mealPlanService'

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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div>
            <label htmlFor="week">Week</label>
            <Field type="text" id="week" name="week" />
            <ErrorMessage name="week" component="div" className="error" />
          </div>

          <FieldArray name="recipes">
            {({ remove, push }) => (
              <>
                {values.recipes.map((_, index) => (
                  <div key={index} className="recipe-section">
                    <h4>Recipe {index + 1}</h4>
                    <div>
                      <label htmlFor={`recipes[${index}].recipeId`}>
                        Recipe ID
                      </label>
                      <Field type="text" name={`recipes[${index}].recipeId`} />
                      <ErrorMessage
                        name={`recipes[${index}].recipeId`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label htmlFor={`recipes[${index}].day`}>Day</label>
                      <Field as="select" name={`recipes[${index}].day`}>
                        <option value="">Select Day</option>
                        {Object.values(DayEnum).map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`recipes[${index}].day`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label htmlFor={`recipes[${index}].mealType`}>
                        Meal Type
                      </label>
                      <Field as="select" name={`recipes[${index}].mealType`}>
                        <option value="">Select Meal Type</option>
                        {Object.values(MealType).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`recipes[${index}].mealType`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label htmlFor={`recipes[${index}].recipeDetails.title`}>
                        Recipe Title
                      </label>
                      <Field
                        type="text"
                        name={`recipes[${index}].recipeDetails.title`}
                      />
                      <ErrorMessage
                        name={`recipes[${index}].recipeDetails.title`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label htmlFor={`recipes[${index}].recipeDetails.image`}>
                        Recipe Image URL
                      </label>
                      <Field
                        type="text"
                        name={`recipes[${index}].recipeDetails.image`}
                      />
                      <ErrorMessage
                        name={`recipes[${index}].recipeDetails.image`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`recipes[${index}].recipeDetails.sourceUrl`}
                      >
                        Recipe Source URL
                      </label>
                      <Field
                        type="text"
                        name={`recipes[${index}].recipeDetails.sourceUrl`}
                      />
                      <ErrorMessage
                        name={`recipes[${index}].recipeDetails.sourceUrl`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <button type="button" onClick={() => remove(index)}>
                      Remove Recipe
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      recipeId: '',
                      day: '' as DayEnum,
                      mealType: '' as MealType,
                      recipeDetails: {
                        title: '',
                        image: '',
                        sourceUrl: '',
                      },
                    })
                  }
                >
                  Add Recipe
                </button>
              </>
            )}
          </FieldArray>

          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
