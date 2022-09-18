interface IResponseArray {
    title: string,
    colour: string,
    rank: string,
    rank_num: number
}

interface IResponseData {
    date: string,
    season: string,
    season_week: number,
    celebrations: [IResponseArray],
    weekday: string
}

const fetchApiDataEn = async (): Promise<IResponseData> => {
    return fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText)
            } else {
                return response.json()
            }
        })
}

const fetchApiDataLa = async (): Promise<IResponseData> => {
    return fetch(`http://calapi.inadiutorium.cz/api/v0/la/calendars/general-la/today`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText)
            } else {
                return response.json()
            }
        })
}



export { fetchApiDataEn, fetchApiDataLa };
