const SSEEventSource = (path: string) => {
  return new EventSource(`${import.meta.env.VITE_BASE_URL}${path}`);
};

export default SSEEventSource;
