import express from 'express'
import axios from 'axios'

const vaccine = express.Router();

vaccine.post('/search', async(req, res) => {
    const endpoint = "https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search"

    const queryParameters = req.body;

    const url = `${endpoint}?${Object.keys(queryParameters)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryParameters[k]))
        .join('&')}`

    try {
        const response = await axios({
            url,
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
            }
        });

        res.status(200).send(
            ...response.data
        )
    } catch(e) {
        res.status(400).send({
            error: true
        })
    }
});

export default vaccine