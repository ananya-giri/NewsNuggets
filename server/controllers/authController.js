import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    sendTokenResponse(user, 201, res)
  } catch (error) {
    console.error('❌ Registration Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide an email and password' })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    sendTokenResponse(user, 200, res)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
}
