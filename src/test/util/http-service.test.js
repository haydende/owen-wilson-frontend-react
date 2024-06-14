
import {NOT_APPLICABLE, URL_BASE} from "../../main/constants";
import HttpService from "../../main/util/http-service";
import { GenericContainer, Wait } from "testcontainers";
import { resolve } from 'path'

describe('HttpService - Unit Tests', () => {

    const globalFetch = global.fetch
    const expectedRequestInit = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }
    let container;
    let actualUrl;
    let actualRequestInit;

    beforeAll(async () => {

        jest.setTimeout(20000)

        const absolutePath = resolve('')
        const wiremockConfigDir = `${absolutePath}/src/test/wiremock-config`
        const mappingsPath = `${wiremockConfigDir}/mappings`
        const filesPath = `${wiremockConfigDir}/__files`

        container = await new GenericContainer("wiremock/wiremock:3.6.0-2-alpine")
            .withExposedPorts(8080)
            .withBindMounts([
                {
                    target: "/home/wiremock/mappings",
                    source: mappingsPath
                },
                {
                    target: "/home/wiremock/__files",
                    source: filesPath
                }
            ])
            .withWaitStrategy(Wait.forLogMessage("extensions:"))
            .start()

        let containerPort = container.getMappedPort(8080)

        const mockFetch = (requestInfo, init) => {
            actualUrl = requestInfo // cannot get jest.spyOn to work, this will do
            actualRequestInit = init
            requestInfo = requestInfo.replace('https://owen-wilson-wow-api.onrender.com', `http://localhost:${containerPort}`)

            return globalFetch(requestInfo, init)
        }
        global.fetch = mockFetch

    })

    afterAll(async () => {
        global.fetch = globalFetch

        if (container) {
            container.stop()
        }
    })

    afterEach(() => {
        actualUrl = "If you see this, the request didn't come through!"
    })

    describe('Get Random Wows', () => {

        it('Results: 5, Year: 2000, Movie: N/A, Director: N/A', async () => {

            const results = 5
            const year = 2000

            const returned = await HttpService.getRandom(results, year, NOT_APPLICABLE, NOT_APPLICABLE)
            expect(returned.length).toEqual(3)

            const expectedUrl = `${URL_BASE}/random?results=${results}&year=${year}`
            expect(actualUrl).toEqual(expectedUrl)
            expect(actualRequestInit).toEqual(expectedRequestInit)
        })

        it('Results: 5, Year: N/A, Movie: N/A, Director: David Dobkin', async () => {
            const results = 5
            const director = 'David Dobkin'

            const returned = await HttpService.getRandom(results, null, NOT_APPLICABLE, director)
            expect(returned.length).toEqual(5)

            const expectedUrl = `${URL_BASE}/random?results=${results}&director=${director}`
            expect(actualUrl).toEqual(expectedUrl)
            expect(actualRequestInit).toEqual(expectedRequestInit)
        })

        it('Results: 10, Year: N/A, Movie: Shanghai Knights, Director: N/A', async () => {
            const results = 10
            const movie = 'Shanghai Knights'

            const returned = await HttpService.getRandom(results, null, movie, NOT_APPLICABLE)
            expect(returned.length).toEqual(4)

            const expectedUrl = `${URL_BASE}/random?results=${results}&movie=${movie}`
            expect(actualUrl).toEqual(expectedUrl)
            expect(actualRequestInit).toEqual(expectedRequestInit)
        })

        it('Results: 50, Year: 9999, Movie: N/A, Director: N/A', async () => {
            const results  = 50;
            const year = 9999;

            const returned = await HttpService.getRandom(results, year, NOT_APPLICABLE, NOT_APPLICABLE)
            expect(returned.length).toEqual(0)

            const expectedUrl = `${URL_BASE}/random?results=${results}&year=${year}`
            expect(actualUrl).toEqual(expectedUrl)
            expect(actualRequestInit).toEqual(expectedRequestInit)
        })
    })
})