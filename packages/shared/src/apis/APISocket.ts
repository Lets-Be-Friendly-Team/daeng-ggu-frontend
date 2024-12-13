import buildURL from '@daeng-ggu/shared/src/utils/buildURL';

const APISocket = (path?: string, queryParams?: Record<string, string>) => {
  const baseURL = import.meta.env.VITE_SOCKET_BASE_URL;
  console.log('baseURL', baseURL);
  console.log('path', path);
  return new WebSocket(
    buildURL({
      baseURL,
      path,
      queryParams,
    }),
  );
};

export default APISocket;
