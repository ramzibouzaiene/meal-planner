import { Button } from 'antd'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'

export const Home = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await logoutUser()

      if (response.message) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error.message)
      alert('Logout failed. Please try again.')
    }
  }
  return (
    <Layout>
      <main>
        <Button
          type="primary"
          style={{ float: 'right' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <h1>Home Page</h1>
      </main>
    </Layout>
  )
}
