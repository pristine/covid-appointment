const apiUrl = `https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search`

const vaccines = {
    "moderna": "779bfe52-0dd8-4023-a183-457eb100fccc",
    "pfizer": "a84fb9ed-deb4-461c-b785-e17c782ef88b",
    "J&J": "784db609-dc1f-45a5-bad6-8db02e79d44f",
}

const findVaccineLocations = async ( vaccine, lat, long, radius ) => {
    
    const vaccineType = vaccines[vaccine.toLowerCase()]

    const queryParameters = {
        medicationGuids: vaccineType,
        lat,
        long,
        radius
    }

    const endpoint = `${apiUrl}?${Object.keys(queryParameters)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')}`

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
        }
    });

    const body = await response.json();

    if (!body.providers) return null;

    return body.providers.filter( provider => provider.in_stock ).map( provider => {

        return {
            name: provider.name,
            address1: provider.address1,
            address2: provider.address2,
            city: provider.city,
            state: provider.state,
            phone: provider.phone,
            distance: provider.distance
        }
    })
}

console.log("asdasd")