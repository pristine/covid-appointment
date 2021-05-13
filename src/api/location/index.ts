import express from 'express'
import zipcodes from 'zipcodes'

const location = express.Router()

location.post('/zip_to_lat_long', async (req, res) => {
    try {
        const zip = req.body.zip;

        if (!zip)
            throw 'no zip code in body';

        const data = zipcodes.lookup(zip)

        return res.status(200).send({
            success: true,
            data
        })
    } catch (e) {
        return res.status(400).send({
            success: false,
            error: e
        })
    }
});

export default location;