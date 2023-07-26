import { useEffect, useRef } from "react";

const Capture = () => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" }, // 外側のカメラを使用
        audio: false, // 音声は不要なので false
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("An error occurred! " + err);
      });
  }, []);

  return <video ref={videoRef} />;
};

export default Capture;
