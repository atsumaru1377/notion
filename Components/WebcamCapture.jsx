// Components/WebcamCapture.js
import React, { useEffect, useRef } from 'react';

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("An error occurred! " + err);
      });

    const capture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0);
      onCapture(canvas.toDataURL('image/png'));
    };

    const intervalId = setInterval(capture, 1000); // every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <video ref={videoRef} />;
};

export default WebcamCapture;
