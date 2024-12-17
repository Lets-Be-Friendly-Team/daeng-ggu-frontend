// src/components/IVSPlayer.tsx
import React, { useEffect, useRef } from 'react';
import { create, isPlayerSupported } from 'amazon-ivs-player';

interface IVSPlayerProps {
  playbackUrl: string; // 백엔드 또는 매칭 로직에서 받아온 IVS 플레이백 URL
}

const IVSPlayer: React.FC<IVSPlayerProps> = ({ playbackUrl }: { playbackUrl: string }) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoEl.current) return;
    if (!isPlayerSupported) {
      console.error('The current browser does not support the Amazon IVS player.');
      return;
    }

    const player = create({
      wasmWorker: '/amazon-ivs-wasmworker.min.js',
      wasmBinary: '/amazon-ivs-wasmworker.min.wasm',
    });
    player.attachHTMLVideoElement(videoEl.current);
    player.load(playbackUrl);
    player.play();

    return () => {
      player.pause();
    };
  }, [playbackUrl]);

  return (
    <video ref={videoEl} controls playsInline className='h-[60rem] w-[46rem] rounded-md border-[1px] border-primary' />
  );
};

export default IVSPlayer;
