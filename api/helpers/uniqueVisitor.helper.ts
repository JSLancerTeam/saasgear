import axios from 'axios';

interface CityCountryResponse {
    country: string;
    city: string;
    zipcode?: string;
    continent?: string;
}

function getCityAndCountry(clientIp: string): Promise<CityCountryResponse | undefined> {
    return axios.get(`https://freeipapi.com/api/json/${clientIp}`)
        .then(response => {
            if (response.status === 200) {
                return {
                    country: response.data.countryName,
                    city: response.data.cityName,
                    zipcode: response.data.zipCode,
                    continent: response.data.continent
                }
            }
            return undefined;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                console.log(error.response, 'error getting city name. uniqueVisitors in helper');
                return { country: '', city: '' };
            }
            return undefined;
        });
}

function getIpAddress(headers: any | undefined, remoteAddress: string | undefined): string | undefined {
    try {
        let clientIp = (headers || '').split(',').shift() || remoteAddress;
        clientIp = clientIp?.replace(/^::ffff:/, '');
        return clientIp;
    } catch (err) {
        console.log('error getting ip');
        return undefined;
    }
}

export { getCityAndCountry, getIpAddress };
