const fetchApiData = () => {
    return fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status + " " + response.statusText)
        } else {
            return response.json()
        }
    })
}



export default fetchApiData;