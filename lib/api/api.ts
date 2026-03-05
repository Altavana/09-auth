import axios from 'axios';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  headers: { Authorization: `Bearer ${myKey}` },
  withCredentials: true, // дозволяє axios працювати з cookie
});

//
