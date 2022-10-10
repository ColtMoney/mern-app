import { Router } from 'express'
import bcrypt from 'bcryptjs'
import  { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'
import User from '../models/User.js'

const router = Router()

router.post(
  '/api/auth/register',
  [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Min. password length is 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid registration data'
      })
    }

    const { email , password } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'User already exsist' }) 
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'User has been created' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again later!' })
  }
})

router.post(
  '/api/auth/login',
  [
    check('email', 'Type correct email').normalizeEmail().isEmail(),
    check('password', 'Type password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid login data'
      })
    }

    const { email , password } = req.body

    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({
      token,
      userId: user.id
    })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again later!' })
  }
})

export default router