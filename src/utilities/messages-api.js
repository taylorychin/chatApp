import sendRequest from './send-request';

const BASE_URL = '/api/messages';

export function getMessages() {
    return sendRequest(`${BASE_URL}/message`);
}