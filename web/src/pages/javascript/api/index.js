import axios from 'axios';
import { useEffect } from 'react';

export default function ApiTest() {
  const loadData = async () => {
    const res = await axios.get(
      'https://api.waqi.info/feed/here/?token=b2b80a604c7636fc6394732f5a31bc4e39c46b64'
    );
    console.log(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <>api</>;
}
