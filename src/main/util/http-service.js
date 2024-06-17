
import { NOT_APPLICABLE, URL_BASE } from "../constants";

export default class HttpService {

    static async getDirectorNames() {
        let requestUrl = `${URL_BASE}/directors`

        return await global.fetch(requestUrl)
            .then(response => response.json())
    }

    static async getMovieNames() {
        let requestUrl = `${URL_BASE}/movies`

        return await global.fetch(requestUrl)
            .then(response => response.json())
    }

    static async getRandom(results, year, movie, director) {

        let requestUrl = `${URL_BASE}/random`
        let isFirstParam = true

        if (results != null) {
            requestUrl = this.addParam(requestUrl, 'results', results, isFirstParam)
            isFirstParam = false;
        }

        if (year != null) {
            requestUrl = this.addParam(requestUrl, 'year', year, isFirstParam)
            isFirstParam = false;
        }

        if (movie != null && movie !== NOT_APPLICABLE) {
            requestUrl = this.addParam(requestUrl, 'movie', movie, isFirstParam)
            isFirstParam = false;
        }

        if (director != null && director !== NOT_APPLICABLE) {
            requestUrl = this.addParam(requestUrl, 'director', director, isFirstParam)
            isFirstParam = false;
        }

        console.debug(`Sending request to: ${requestUrl}`)
        return await global
            .fetch(requestUrl,
                {
                    method: 'GET'
                }
            )
            .then(async r => await r.json())
    }

    static async getOrdered(startIndex, endIndex) {
        let requestUrl = `${URL_BASE}/ordered/${startIndex}`

        let concat;
        if (endIndex && endIndex >= startIndex) {
            concat = `-${endIndex}`
        } else {
            concat = `-${startIndex}`
        }

        requestUrl = requestUrl.concat(concat)

        console.debug(`Sending request to: ${requestUrl}`)
        return await global.fetch(requestUrl)
            .then(response => response.json())
    }

    static addParam(requestUrl, paramName, paramVal, isFirstParam) {
        let param = `${paramName}=${paramVal}`
        return requestUrl + (isFirstParam ? '?' : '&') + param
    }

}