
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

        return await global
            .fetch(requestUrl,
                {
                    method: 'GET'
                }
            )
            .then(async r => await r.json())
    }

    static addParam(requestUrl, paramName, paramVal, isFirstParam) {
        let param = `${paramName}=${paramVal}`
        return requestUrl + (isFirstParam ? '?' : '&') + param
    }

}