const loadNaverMapsScript = (clientId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('naver-maps-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-maps-script';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Naver Maps API failed to load.'));
    document.head.appendChild(script);
  });
};

export default loadNaverMapsScript;
