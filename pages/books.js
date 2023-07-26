// pages/books.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Quagga from 'quagga';

const WebcamCapture = dynamic(
  () => import('../Components/WebcamCapture'),
  { ssr: false }
);

const Books = () => {
  const [isbn, setIsbn] = useState(null);

  const handleCapture = (imageSrc) => {
    Quagga.decodeSingle({
      decoder: {
        readers: ['ean_reader']
      },
      locate: true,
      src: imageSrc,
      numOfWorkers: 0,
      inputStream: {
        size: 800
      }
    }, (result) => {
      if (result && result.codeResult) {
        setIsbn(result.codeResult.code);
      } else {
        console.log('No barcode detected');
      }
    });
  };

  useEffect(() => {
    const fetchBookData = async () => {
      if (!(isbn && isbn.length === 13)) return;
      try {
        const res = await fetch(`/api/get_book_data?isbn=${isbn}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchBookData();
  }, [isbn]);

  return (
    <div>
      <WebcamCapture onCapture={handleCapture} />
      {isbn && <div>ISBN: {isbn}</div>}
    </div>
  );
};

export default Books;
