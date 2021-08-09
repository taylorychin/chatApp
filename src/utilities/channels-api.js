//should be able to create and edit channels,
//router for channels 


import sendRequest from './send-requests';

const BASE_URL = '/api/channels';

export function createChannel(formData) {
    return sendRequest(BASE_URL, 'POST', formData);
}

export function getAll() {
    return sendRequest(BASE_URL);
}