import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addFavorite } from '../services/favoriteService'
import { Favorite } from '../types/favoriteTypes'

const validationSchema = Yup.object({
  recipeDetails: Yup.object({
    title: Yup.string().required('Title is required'),
    image: Yup.string().url('Invalid URL format'),
    sourceUrl: Yup.string().url('Invalid URL format'),
  }),
})

const initialValues: Favorite = {
  userId: '',
  recipeId: '',
  recipeDetails: {
    title: '',
    image: '',
    sourceUrl: '',
  },
}

const handleSubmit = async (
  values: Favorite,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await addFavorite(values)
    if (response.message) {
      console.log('Favorite added successfully:', values)
    } else {
      console.error('An error occurred while submitting the form.')
    }
  } catch (error) {
    console.error('An error occurred while submitting the form.', error)
  } finally {
    setSubmitting(false)
  }
}

export const Favorites = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Recipe Title</label>
            <Field type="text" id="title" name="recipeDetails.title" />
            <ErrorMessage name="recipeDetails.title" component="div" />
          </div>
          <div>
            <label htmlFor="image">Recipe Image URL</label>
            <Field type="text" id="image" name="recipeDetails.image" />
            <ErrorMessage name="recipeDetails.image" component="div" />
          </div>
          <div>
            <label htmlFor="sourceUrl">Recipe Source URL</label>
            <Field type="text" id="sourceUrl" name="recipeDetails.sourceUrl" />
            <ErrorMessage name="recipeDetails.sourceUrl" component="div" />
          </div>
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
