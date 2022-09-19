import { Command } from '@pipedrive/app-extensions-sdk';

export default class ApiClient {
  constructor(sdk) {
    this.sdk = sdk;
  }

  async fetch(url, method, payload = {}) {
    const { token } = await this.sdk.execute(Command.GET_SIGNED_TOKEN);

    return this.fetchWithToken(url, method, payload, token);
  }

  async fetchWithToken(url, method, payload, token) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (method !== 'GET') {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${url}?token=${token}`, options);

    if (method === 'GET' || method === 'POST') {
      return response.json();
    }

    return response;
  }
}
