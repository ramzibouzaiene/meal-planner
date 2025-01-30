import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Favorite } from '../types/favoriteTypes'
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
  updateFavorite,
} from '../services/favoriteService'
import { CustomModal } from '../Components/Modal/Modal'
import { DataTable } from '../Components/DataTable/DataTable'
import Layout from '../Components/Layout/Layout'
import { getFavoriteById } from '../services/favoriteService'

export const Favorites = () => {
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Image', dataIndex: 'image', key: 'image' },
    { title: 'Source URL', dataIndex: 'sourceUrl', key: 'sourceUrl' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text: string, record) => (
        <>
          <a onClick={() => showUpdateModal(record.id)}>Update</a>
          &nbsp; | &nbsp;
          <a
            onClick={() => showDeleteModal(record.id)}
            style={{ color: 'red' }}
          >
            Delete
          </a>
        </>
      ),
    },
  ]
  const [open, setOpen] = useState(false)
  const [favoriteId, setFavoriteId] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [favoriteData, setFavoriteData] = useState<Favorite[]>([])
  const [favoriteDetails, setFavoriteDetails] = useState<Favorite>({
    userId: null,
    recipeId: '',
    recipeDetails: {
      title: '',
      image: '',
      sourceUrl: '',
    },
  })
  const [formData, setFormData] = useState({
    userId: '',
    recipeId: '',
    recipeDetails: {
      title: '',
      image: '',
      sourceUrl: '',
    },
  })
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log('name, value', name, value)
    setFormData((prevData) => ({
      ...prevData,
      recipeDetails: {
        ...prevData.recipeDetails,
        [name]: value,
      },
    }))
  }

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log('name, value', name, value)

    setFavoriteDetails((prevData) => ({
      ...prevData,
      recipeDetails: {
        ...prevData.recipeDetails,
        [name]: value,
      },
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
        fetchFavorites()
        clodeModal()
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
      .map((res: Favorite) => {
        const recipes = Array.isArray(res.recipeDetails)
          ? res.recipeDetails
          : [res.recipeDetails]

        return recipes.map((recipe) => ({
          ...recipe,
          id: res._id,
        }))
      })
      .flat()

    setFavoriteData(formattedData)
  }

  const getFavoriteDetails = async () => {
    try {
      const response = await getFavoriteById(favoriteId)
      console.log('getFavoriteById', response.favorite)

      setFavoriteDetails(response.favorite)
    } catch (error) {
      console.error('Error fetching favorite details:', error)
    }
  }

  const handleDelete = async () => {
    try {
      console.log('handleDelete id:', favoriteId)
      const response = await deleteFavorite(favoriteId)
      if (response?.message) {
        clodeDeleteModal()
        message.success('Favorite deleted successfully.')
        window.location.reload()
      } else {
        message.error('An error occurred while deleting favorite')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const updatedData = {
        ...favoriteDetails,
        userId,
      }
      console.log('updatedData', updatedData)
      const response = await updateFavorite(updatedData)
      if (response?.message) {
        clodeUpdateModal()
        message.success('Favorite updated successfully.')
        window.location.reload()
      } else {
        message.error('An error occurred while updating favorite')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const showModal = () => {
    setOpen(true)
  }

  const clodeModal = () => {
    setOpen(false)
  }

  const showDeleteModal = (id: string) => {
    setOpenDeleteModal(true)
    setFavoriteId(id)
    console.log('showDeleteModal id:', id)
  }

  const clodeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const clodeUpdateModal = () => {
    setOpenUpdateModal(false)
  }

  const showUpdateModal = (id: string) => {
    getFavoriteDetails()
    setOpenUpdateModal(true)
    setFavoriteId(id)
    console.log('showUpdateModal id:', id)
  }

  useEffect(() => {
    fetchFavorites()
    getFavoriteDetails()
  }, [favoriteId])

  return (
    <Layout>
      <Button type="primary" onClick={showModal}>
        Add Favorite
      </Button>
      <CustomModal
        title="Update Favorite"
        openModal={openUpdateModal}
        handleModal={clodeUpdateModal}
        handleOk={handleUpdate}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              name="title"
              value={favoriteDetails?.recipeDetails?.title || ''}
              onChange={handleFavoriteChange}
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
              name="sourceUrl"
              value={favoriteDetails?.recipeDetails?.sourceUrl || ''}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </CustomModal>
      <CustomModal
        title="Delete Confirmation"
        openModal={openDeleteModal}
        handleModal={clodeDeleteModal}
        handleOk={handleDelete}
      >
        <p>Are you sure you want to delete this favorite ?</p>
      </CustomModal>
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
              name="sourceUrl"
              value={formData.recipeDetails.sourceUrl}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </CustomModal>

      <DataTable
        columns={columns}
        data={favoriteData.map((item) => ({
          ...item,
          key: item.id || item._id,
        }))}
      />
    </Layout>
  )
}
