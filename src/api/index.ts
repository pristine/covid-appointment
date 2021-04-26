import express from 'express'

import location from './location'

const api = express.Router()

api.use('/location', location);

export default api;