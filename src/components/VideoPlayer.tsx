import React from 'react';
import { VideoPlayerProps } from '../types';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoKey }) => {
  if (!videoKey) {
    return null;
  }

  return (
    <iframe
      width={'600'}
      height={'400'}
      src={`https://www.youtube.com/embed/${videoKey}`}
      title='YouTube video player'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      className=' rounded-lg shadow-md'
    ></iframe>
  );
};

export default VideoPlayer;
