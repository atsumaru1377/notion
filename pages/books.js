// pages/books.js
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Quagga from "quagga";

const WebcamCapture = dynamic(
  () => import("../Components/WebcamCapture"),
  { ssr: false }
);

const Books = () => {
  const [isbn, setIsbn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleCapture = (imageSrc) => {
    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // this reader is for ISBN
      },
      locate: true,
      src: imageSrc,
      numOfWorkers: 0, // Needs to be 0 when used within node
      inputStream: {
        size: 800,
      },
    }, function (result) {
      if (result.codeResult) {
        setIsbn(result.codeResult.code);
      } else {
        setIsbn("No barcode detected");
      }
    });
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!(isbn && isbn.length === 13)) return;
      try {
        const res = await fetch(`/api/get_book_data?isbn=${isbn}`);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchBookData();
  }, [isbn]);

  return (
    <div>
      {<WebcamCapture onCapture={handleCapture} />}
      {isbn && <div>ISBN: {isbn}</div>}
    </div>
  );
};

export default Books;
