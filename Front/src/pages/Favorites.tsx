import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Favorite } from '../types/favoriteTypes'
import { addFavorite, getAllFavorites } from '../services/favoriteService'
import { CustomModal } from '../Components/Modal/Modal'
import { DataTable } from '../Components/DataTable/DataTable'
import Layout from '../Components/Layout/Layout'

const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Image', dataIndex: 'image', key: 'image' },
  {
    title: 'Source URL',
    dataIndex: 'sourceUrl',
    key: 'sourceUrl',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
]

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

export const Favorites = () => {
  const [open, setOpen] = useState(false)
  const [favoriteData, setFavoriteData] = useState<Favorite[]>([])
  const [formData, setFormData] = useState({
    userId: '',
    recipeId: '',
    recipeDetails: {
      title: '',
      image: '',
      sourceUrl: '',
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleUploadChange = (info) => {
    if (info.fileList.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        recipeDetails: {
          ...prevData.recipeDetails,
          image: info.fileList[0]?.originFileObj || '',
        },
      }))
    }
  }

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId')
    const updatedValues = { ...formData, userId }

    try {
      const response = await addFavorite(updatedValues)

      if (response?.message) {
        message.success('Favorite added successfully.')
        fetchFavorites() // Refresh favorites after adding
        clodeModal() // Close modal after submission
      } else {
        message.error('An error occurred while submitting the form.')
      }
    } catch (error) {
      message.error('An error occurred while submitting the form.')
      console.error('Error:', error)
    }
  }

  const fetchFavorites = async () => {
    const response = await getAllFavorites()
    console.log('fav res', response.data)

    const formattedData = response.data
      .map((res: Favorite) =>
        Array.isArray(res.recipeDetails)
          ? res.recipeDetails
          : [res.recipeDetails]
      )
      .flat()

    setFavoriteData(formattedData)
  }

  const clodeModal = () => {
    setOpen(false)
  }

  const showModal = () => {
    setOpen(true)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <Layout>
      <Button type="primary" onClick={showModal}>
        Add Favorite
      </Button>

      <CustomModal
        title="Add Favorite"
        openModal={open}
        handleModal={clodeModal}
        handleOk={handleSubmit}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              name="title"
              value={formData.recipeDetails.title}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              onChange={handleUploadChange}
            >
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Source URL">
            <Input
              name="recipeDetails.sourceUrl"
              value={formData.recipeDetails.sourceUrl}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </CustomModal>

      <DataTable columns={columns} data={favoriteData} />
    </Layout>
  )
}
