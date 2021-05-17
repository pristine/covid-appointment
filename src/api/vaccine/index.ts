import express from 'express'
import request from 'request'

const vaccine = express.Router();

vaccine.get('/search', (req, res) => {
    const query = req.query;

    request(
        { 
            url: `https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?${Object.keys(query)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k] as string))
                .join('&')}`  
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(400).json({ error: true });
          }
    
          return res.json(JSON.parse(body));
        }
    )
});

export default vaccine