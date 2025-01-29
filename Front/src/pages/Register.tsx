import { useState } from 'react'
import { RegisterData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import type { FormProps } from 'antd'
import { Button, Divider, Form, Input } from 'antd'

export const Register = () => {
  const navigate = useNavigate()

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
  })

  const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
    try {
      console.log('this is form => ', values)
      const registerData = await registerUser(values)
      console.log('registerData', registerData)
      navigate('/login')
    } catch (error) {
      console.error('Register failed:', error)
    }
  }
  const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<RegisterData>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          value={registerForm.username}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, username: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item<RegisterData>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item<RegisterData>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
          value={registerForm.password}
        />
        <Divider style={{ borderColor: '#7cb305' }}>
          <a href="/login">Already have account ?</a>
        </Divider>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
