import request, { Request, Response } from 'request';
import oandaRequestLogger from '../tools/oanda-request-logger';

const { OANDA_TOKEN, OANDA_API_URL } = process.env;

class Pricing {

    private accountId: string;

    constructor(accountId) {
        this.accountId = accountId;
    }

    price(currencies: string[]): Promise<Object> {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${OANDA_API_URL}/v3/accounts/${this.accountId}/pricing`,
                headers: {
                    Authorization: `Bearer ${OANDA_TOKEN}`,
                    'Accept-Datetime-Format': 'UNIX',
                },
                qs: {
                    instruments: currencies.join(',')
                }
            };
            const _request: Request = request(options);

            oandaRequestLogger(_request);

			_request.on('response', (response: Response) => {
				let result: string = '';
				response.on('data', (data: Buffer) => {
					result += data;
				});
				response.on('end', () => {
					if (response.statusCode === 200) {
						resolve(JSON.parse(result.toString()));
					} else {
						reject({
							status: response.statusCode,
							message: response.statusMessage || 'error on account request',
						});
					}
				});
			});

			_request.on('error', (error: Error) => {
				reject(error);
            });
            
        })
    }
}

export default Pricing;