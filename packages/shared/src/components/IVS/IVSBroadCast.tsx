/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react';
import IVSBroadcastClient, { BASIC_LANDSCAPE } from 'amazon-ivs-web-broadcast';

const IVSBroadCast = ({ ingestEndpoint, streamKey }: { ingestEndpoint: string; streamKey: string }) => {
  const clientRef = useRef<ReturnType<typeof IVSBroadcastClient.create> | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startBroadcast = async () => {
      try {
        if (!clientRef.current) return;
        await clientRef.current.startBroadcast(streamKey);
        console.log('Broadcast started');
      } catch (err: any) {
        console.error('Failed to start broadcast:', err);
      }
    };

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (!clientRef.current) {
          clientRef.current = IVSBroadcastClient.create({
            streamConfig: BASIC_LANDSCAPE,
            ingestEndpoint,
          });
        }

        if (previewRef.current) {
          clientRef.current.attachPreview(previewRef.current);
        }

        clientRef.current.addVideoInputDevice(stream, 'camera1', { index: 0 });
        startBroadcast();
      } catch (err: any) {
        console.error('Failed to initialize broadcast client:', err);
      }
    })();

    return () => {
      // 클라이언트 정리
      if (clientRef.current) {
        clientRef.current.stopBroadcast();
        clientRef.current = null;
      }
    };
  }, [ingestEndpoint, streamKey]);

  return (
    <>
      <canvas
        ref={previewRef}
        width={BASIC_LANDSCAPE.maxResolution.width}
        height={BASIC_LANDSCAPE.maxResolution.height}
        className='w-full h-[30rem] mt-[2rem]'
      />
    </>
  );
};

export default IVSBroadCast;
