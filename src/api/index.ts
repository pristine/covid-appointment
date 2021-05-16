import express from 'express'

import location from './location'
import vaccine from './vaccine'

const api = express.Router()

api.use('/location', location);
api.use('/vaccine', vaccine);

export default api;