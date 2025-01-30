import { Button } from 'antd'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
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
