import request, { Request, Response } from 'request';
import oandaRequestLogger from '../tools/oanda-request-logger';

const { OANDA_TOKEN, OANDA_API_URL } = process.env;

class Account {
	constructor() {}

	/**
	 * Base for /v3/accounts  oanda requests
	 * @param {requestOptions} options - requst options
	 * @returns {Promise<object>} - response data
	 */
	static async accountBase(options: any): Promise<object> {
		return new Promise((resolve, reject) => {
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
		});
	}

	/**
	 * Get a list of all Accounts authorized for the providen token
	 * @returns {promise<object>}  The list of authorized Accounts has been provided
	 */
	static async allAccounts(): Promise<Object> {
		const options = {
			method: 'GET',
			url: `${OANDA_API_URL}/v3/accounts`,
			headers: {
				Authorization: `Bearer ${OANDA_TOKEN}`,
			},
		};

		return Account.accountBase(options);
	}

	/**
	 * get the full details for single account
	 * @param {string} accountId - account id
	 * @returns {promise<object>} The full Account details are provided
	 */
	static async account(accountId: string): Promise<Object> {
		const options = {
			method: 'GET',
			url: `${OANDA_API_URL}/v3/accounts/${accountId}`,
			headers: {
				Authorization: `Bearer ${OANDA_TOKEN}`,
				'Accept-Datetime-Format': 'UNIX',
			},
		};

		return Account.accountBase(options);
	}

	/**
	 * Get the summary of a single account
	 * @param {string} accountId
	 * @returns {promise<object>} - the summary of a single account provided
	 */
	static async accountSummary(accountId: string): Promise<Object> {
		const options = {
			method: 'GET',
			url: `${OANDA_API_URL}/v3/accounts/${accountId}/summary`,
			headers: {
				Authorization: `Bearer ${OANDA_TOKEN}`,
				'Accept-Datetime-Format': 'UNIX',
			},
		};

		return Account.accountBase(options);
	}

	/**
	 * Get the list of tradeable instruments for given account
	 * @param {string} accountId - account id
	 * @returns {promise<object>} - List of instruments to query specifically.
	 */
	static async accountInstruments(accountId: string): Promise<Object> {
		const options = {
			method: 'GET',
			url: `${OANDA_API_URL}/v3/accounts/${accountId}/instruments`,
			headers: {
				Authorization: `Bearer ${OANDA_TOKEN}`,
				'Accept-Datetime-Format': 'UNIX',
			},
		};

		return Account.accountBase(options);
	}
}

export default Account;
