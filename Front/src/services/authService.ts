import { LoginData, RegisterData } from '../types/authTypes'

const API_URL = 'http://localhost:5000/api/auth'

export const loginUser = async (
  loginData: LoginData
): Promise<{ accessToken: string; userId: string }> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    return response.json()
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const registerUser = async (
  registerData: RegisterData
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })

    if (!response.ok) {
      throw new Error('Registration failed')
    }

    return response.json()
  } catch (error) {
    throw new Error('Registration failed: ' + error.message)
  }
}
