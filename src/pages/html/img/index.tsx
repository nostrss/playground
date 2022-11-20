import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ImagePage() {
  const [dogImg, setDogImg] = useState('');

  const getImage = () => {
    setTimeout(async () => {
      const img = await axios.get('https://random.dog/woof.json');
      setDogImg(img.data.url);
    }, 3000);
  };

  useEffect(() => {
    getImage();
  }, []);

  const handleImgError = (e: any) => {
    e.target.src = `${process.env.PUBLIC_URL}/images/no-pictures.png`;
  };

  return (
    <div>
      <div>
        <img
          src={dogImg}
          style={{ width: '400px' }}
          id='onError'
          alt='random dog'
          onError={handleImgError}
        />
      </div>
    </div>
  );
}
