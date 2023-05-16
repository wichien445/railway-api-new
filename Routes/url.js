const express = require('express')
const router = express.Router()
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetHistory } = require('../Controllers/url')

router.post('/', handleGenerateNewShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/history', handleGetHistory)

module.exports = router