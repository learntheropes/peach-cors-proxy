import { readBody, getQuery, getRequestHeaders } from 'h3';
import { ofetch } from 'ofetch';

export default defineEventHandler(async (event) => {

  const apiFetch = ofetch.create({
    baseURL: `https://api.peachbitcoin.com`,
    // ignoreResponseError: true,
    async onRequestError({ request, error }) {
      console.log('[fetch request error]', request, error);
    },
    async onResponseError({ request, response }) {
      console.log('[fetch response error]', request, response._data);
    }
  });

  const method = event.method;

  const params = event.context.params._;

  const headers = getRequestHeaders(event);
  headers.host = 'api.peachbitcoin.com'

  const query = getQuery(event);

  let body;
  if (method !== 'GET') {

    body = await readBody(event);
  };

  return await apiFetch(`/${params}`, {
    method,
    headers,
    query,
    body
  });
});
