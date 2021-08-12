//should be able to create and edit channels,
//router for channels 


import sendRequest from './send-requests';

const BASE_URL = '/api/channels';

export function createChannel(formData) {
    return sendRequest(BASE_URL, 'POST', formData);
}

export function getOne(channelId) {
    return sendRequest(`${BASE_URL}/${channelId}`);
}

export function sendMessage(channelId, message) {
    console.log(channelId, message);
    return sendRequest(`${BASE_URL}/${channelId}/send`, 'POST', message);
}

export function getAll() {
    return sendRequest(BASE_URL);
}

export function deleteChannel(channelId) {
    return sendRequest(`${BASE_URL}/${channelId}`, 'DELETE')
}