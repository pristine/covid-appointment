const getCurrentLocation = async (
    zip
) => {
    const clientMasterId = 426227;

    const queryParameters = {
        clientMasterId,
        searchText: zip,
        _: Date.now()
    }

    const response = await fetch(
        `https://book-costcopharmacy.appointment-plus.com/get-location-by-search?${Object.keys(queryParameters).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')}`, {
            methd: 'GET',
            headers: {
                accept: 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            }
        }  
    )

    const body = await response.json()

    if (!body.coordinatesObject || !body.searchText) return null;

    return {
        ...body.coordinatesObject,
        searchText: body.searchText
    };
}

const getStoreLocations = async (
    locationData,
    radius
) => {
    const clientMasterId = 426227;

    const queryParameters = {
        clientMasterId,
        pageNumber: 1,
        itemsPerPage: 10,
        keyword: locationData.searchText,
        clientId: '',
        employeeId: '',
        radiusInKilometers: radius,
        'centerCoordinates[accuracy]': '',
        _: Date.now()
    }

    for (const [key, value] of Object.entries(locationData)) {
        queryParameters[`centerCoordinates[${key}]`] = value
    }

    const response = await fetch(`https://book-costcopharmacy.appointment-plus.com/book-appointment/get-clients?${Object.keys(queryParameters).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')}`, {
        methd: 'GET',
        headers: {
            accept: 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        }
    })

    const body = await response.json();

    if (!body.clientObjects) return null;

    const clientObjects = body.clientObjects.map( clientObject => {
        return {
            address: `${clientObject.address1}, ${clientObject.address2}`,
            city,
            postalCode,
            phone,
            locationName,
            distanceFromCoordinatesInMiles
        }
    })

    return clientObjects;
}

module.exports = {
    getCurrentLocation,
    getStoreLocations
}