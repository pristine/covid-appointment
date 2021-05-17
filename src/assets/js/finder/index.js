const apiUrl = `https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search`

const vaccines = {
    "moderna": "779bfe52-0dd8-4023-a183-457eb100fccc",
    "pfizer": "a84fb9ed-deb4-461c-b785-e17c782ef88b",
    "J&J": "784db609-dc1f-45a5-bad6-8db02e79d44f",
}

const findVaccineLocations = async ( vaccine, lat, long, radius ) => {

    if (!vaccine || !lat || !long || !radius) return null;

    try {
        const vaccineType = vaccines[vaccine.toLowerCase()]

        const query = {
            medicationGuids: vaccineType,
            lat,
            long,
            radius
        }
    
        const response = await fetch(`/cors_anywhere/https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?${Object.keys(query)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
            .join('&')}`, {
            method: "GET",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
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
                zip: provider.zip,
                phone: provider.phone,
                distance: provider.distance,
                lat: provider.lat,
                long: provider.long
            }
        })
    } catch(e) {
        return null
    }
    
}

const zipToLatLong = async( zip ) => {

    if (!zip) return null;

    try {
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
    
        const responseBody = await response.json();
    
        if (!responseBody.data) return null;
    
        return {
            latitude: responseBody.data.latitude,
            longitude: responseBody.data.longitude
        }
    } catch(e) {
        return null
    }
}

window.onload = () => { 
    document.getElementById("submitButton").onclick = async () => {
        document.getElementById("submitButton").innerText  = "Checking Locations..."
        document.getElementById("submitButton").disabled  = true

        const radiusElement = document.getElementById("Radius");
        const radius = radiusElement.options[radiusElement.selectedIndex].text.split(" ")[0];
    
        const vaccineElement = document.getElementById("Vaccine");

        const vaccine = vaccineElement.options[vaccineElement.selectedIndex].text;
    
        const zipCode = document.getElementById("Zipcode").value;
    
        const latLong = await zipToLatLong(zipCode)
    
        if (!latLong) {
            document.getElementById("submitButton").innerText = "Let's Check!"
            document.getElementById("submitButton").disabled = false
            return
        }

        const locations = await findVaccineLocations(vaccine, latLong.latitude, latLong.longitude, radius);

        if (!locations) {
            document.getElementById("submitButton").innerText = "Let's Check!"
            document.getElementById("submitButton").disabled = false
            return
        }

        document.getElementById("container").remove()

        const newContainer = document.createElement("div")
        newContainer.id = "container2"
        newContainer.classList.add("container");

        const newDiv = document.createElement("div");
        newDiv.id = "wrap2"
        newDiv.classList.add('form-wrap');

        document.body.appendChild(newContainer)
        newContainer.appendChild(newDiv)

        locations.forEach( location => {
            const newElement = document.createElement("h1")
            newElement.innerHTML = `<a href="https://www.google.com/maps/search/${location.lat},+${location.long}/">${location.name}</a>`
            newDiv.appendChild(newElement)

            const newElement2 = document.createElement("p")
            newElement2.innerHTML = `<strong> Address: </strong><br /> ${location.address1}`

            if (location.address2)
                newElement2.innerHTML += `, ${location.address2}`

            newElement2.innerHTML += `<br />${location.city}, ${location.state} ${location.zip}<br />`

            newElement2.innerHTML += `<strong> Phone: </strong> ${location.phone}<br /><strong> Distance: </strong> ${location.distance} Miles<br />`

            const separator = document.createElement("hr")
            separator.classList.add("rounded")

            newDiv.appendChild(newElement2)
            newDiv.appendChild(separator)
        })
    };
};