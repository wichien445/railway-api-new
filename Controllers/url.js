const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = shortid()

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [], 
    })
    return res.json({id: shortID})
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

async function handleGetHistory(req, res){
    try {
        // Get ALL URL
        const url = await URL.find({});
        res.json(url);
      } catch (err) {
        res.status(400).json({ error: err });
      }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetHistory
}