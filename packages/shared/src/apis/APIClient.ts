import APIFetch from '../apis/APIFetch';

export const API_URL = import.meta.env.VITE_BASE_URL;

const header = new Headers({
  'Content-Type': 'application/json',
});

export const APIClient = new APIFetch(API_URL, header);
