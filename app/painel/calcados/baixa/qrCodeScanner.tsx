import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = () => {
  const [data, setData] = useState<object>({});

  console.log('está aqui')

  return (
    <>
      <QrReader
        className='w-full'
        constraints={{
          // advanced: [
          //   {
          //     facingMode: "environment",
          //     width: { ideal: 1280 },
          //     height: { ideal: 720 },
          //   },
          // ]
        }}
        onResult={(result, error) => {
          if (result) setData(result);
          if (error) console.error("veio no erro: ", error);
        }}
      />
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default Test;
