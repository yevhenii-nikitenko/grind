import request from 'request';

const { OANDA_TOKEN, OANDA_API_URL } = process.env;

class Account {
    constructor() {}

    static allAccounts(callback) {
        request(
            {
                method: 'GET',
                url: `${OANDA_API_URL}/v3/accounts`,
                headers: {
                    Authorization: `Bearer ${OANDA_TOKEN}`,
                },
            } /*, (e, r, b) => {
            console.log('All', e, b)
        }*/
        )
            .on('response', (response: any) => {
                const result: Buffer[] = [];
                response.on('data', (data: Buffer) => {
                    result.push(data);
                });
                response.on('end', () => {
                    if (response.statusCode === 200) {
                        callback(null, JSON.parse(result.toString()));
                    } else {
                        callback(
                            {
                                status: response.statusCode,
                                message: 'Unable to recieve accounts',
                            },
                            null
                        );
                    }
                });
            })
            .on('error', (error: Error) => {
                callback(error, null);
            });
    }
}

export default Account;
