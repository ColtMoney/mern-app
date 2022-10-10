import { Router } from 'express'
import Link from '../models/Link.js'
import auth from '../middleware/auth.middleware.js'
import config from 'config'
import shortid from 'shortid'

const router = Router()

router.post('/api/link/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const { from } = req.body

    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if(existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code

    const link = new Link({
      code, to, from, owner: req.user.userId, 
    })

    await link.save()

    res.status(201).json({ link })

  } catch(e) {
    res.status(500).json({ message: 'Something went wrong, please try again later!' })
  }
})

router.get('/api/links/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch(e) {
    res.status(500).json({ message: 'Something went wrong, please try again later!' })
  }
})

router.get('/api/link/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch(e) {
    res.status(500).json({ message: 'Something went wrong, please try again later!' })
  }
})

export default router