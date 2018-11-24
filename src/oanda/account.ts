import request, { Request, Response } from 'request';
import oandaRequestLogger from '../tools/oanda-request-logger';

const { OANDA_TOKEN, OANDA_API_URL } = process.env;

class Account {
	constructor() {}

	static async accountBase() {
		
	}

	/**
	 * Get a list of all Accounts authorized for the providen token
	 * @returns {object}  The list of authorized Accounts has been provided
	 */
	static async allAccounts(accountId: string = ''): Promise<Object> {
		return new Promise((resolve, reject) => {
			const _request: Request = request({
				method: 'GET',
				url: `${OANDA_API_URL}/v3/accounts${!accountId ? '' : '/'.concat(accountId)}`,
				headers: {
					Authorization: `Bearer ${OANDA_TOKEN}`,
				},
			});

			oandaRequestLogger(_request);

			_request.on('response', (response: Response) => {
				const result: Buffer[] = [];
				response.on('data', (data: Buffer) => {
					result.push(data);
				});
				response.on('end', () => {
					if (response.statusCode === 200) {
						resolve(JSON.parse(result.toString()));
					} else {
						reject({
							status: response.statusCode,
							message: 'Unable to recieve accounts',
						});
					}
				});
			});

			_request.on('error', (error: Error) => {
				reject(error);
			});
		});
	}

	/**
	 * get the full details for single account
	 * @param {string} accountId - account id
	 * @returns {object} full account details
	 */
	static async account(accountId): Promise<Object> {
		return Account.allAccounts(accountId);
	}
}

export default Account;
