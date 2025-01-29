import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  message,
} from 'antd'
import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'
import { addMealPlan } from '../services/mealPlanService'
import Layout from '../Components/Layout/Layout'

const { Title } = Typography
const { Option } = Select

export const MealPlans = () => {
  const [form] = Form.useForm()
  const [recipes, setRecipes] = useState([
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
  ])

  const handleAddRecipe = () => {
    setRecipes([
      ...recipes,
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
    ])
  }

  const handleRemoveRecipe = (index: number) => {
    const newRecipes = [...recipes]
    newRecipes.splice(index, 1)
    setRecipes(newRecipes)
  }

  const handleSubmit = async (values: MealType) => {
    try {
      const response = await addMealPlan(values)
      if (response.message) {
        message.success('Meal Plan added successfully')
        form.resetFields()
        setRecipes([
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
        ])
      } else {
        message.error('An error occurred while submitting the form')
      }
    } catch (error) {
      message.error('An error occurred while submitting the form')
    }
  }

  return (
    <Layout>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          week: '',
        }}
        layout="vertical"
      >
        <Title level={3}>Meal Plan</Title>

        <Form.Item
          label="Week"
          name="week"
          rules={[{ required: true, message: 'Week is required' }]}
        >
          <Input />
        </Form.Item>

        {recipes.map((_, index) => (
          <div key={index} className="recipe-section">
            <Title level={4}>Recipe {index + 1}</Title>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Recipe ID"
                  name={['recipes', index, 'recipeId']}
                  rules={[{ required: true, message: 'Recipe ID is required' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Day"
                  name={['recipes', index, 'day']}
                  rules={[{ required: true, message: 'Day is required' }]}
                >
                  <Select placeholder="Select Day">
                    {Object.values(DayEnum).map((day) => (
                      <Option key={day} value={day}>
                        {day}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Meal Type"
                  name={['recipes', index, 'mealType']}
                  rules={[{ required: true, message: 'Meal Type is required' }]}
                >
                  <Select placeholder="Select Meal Type">
                    {Object.values(MealType).map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Recipe Title"
                  name={['recipes', index, 'recipeDetails', 'title']}
                  rules={[
                    { required: true, message: 'Recipe Title is required' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Recipe Image URL"
                  name={['recipes', index, 'recipeDetails', 'image']}
                  rules={[{ type: 'url', message: 'Invalid image URL' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Recipe Source URL"
                  name={['recipes', index, 'recipeDetails', 'sourceUrl']}
                  rules={[{ type: 'url', message: 'Invalid source URL' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="dashed"
              danger
              onClick={() => handleRemoveRecipe(index)}
            >
              Remove Recipe
            </Button>
          </div>
        ))}

        <Form.Item>
          <Button type="dashed" onClick={handleAddRecipe}>
            Add Recipe
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
