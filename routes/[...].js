import { readBody, getQuery, getRequestHeaders } from 'h3';
import { ofetch } from 'ofetch';

export default defineEventHandler(async (event) => {

  const apiFetch = ofetch.create({
    baseURL: `https://api.peachbitcoin.com`,
    // ignoreResponseError: true,
    async onRequest({ request, options }) {
      console.log("[peach fetch request]", request, options);
    },
    async onRequestError({ request, error }) {
      console.log('[peach fetch request error]', request, error);
    },
    async onResponseError({ request, response }) {
      console.log('[peach fetch response error]', request, response._data);
    }
  });

  const method = event.method;

  const params = event.context.params._;

  const headers = getRequestHeaders(event);
  headers.host = 'api.peachbitcoin.com'

  const query = getQuery(event);

  console.log('method', method);
  console.log('params', params);
  console.log('headers', headers);
  console.log('query', query);
  console.log('body', body);

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
