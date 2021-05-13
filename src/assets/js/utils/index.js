
const zipToLatLong = async( zip ) => {
    const body = {
        zip
    }

    const response = await fetch(`/api/location/zip_to_lat_long`, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
          },
        body: JSON.stringify(body)
    })

    const body = await response.json();

    if (!body.data) return null;

    return {
        latitude: body.data.latitude,
        longitude: body.data.longitude
    }
}


module.exports = {
    zipToLatLong
}