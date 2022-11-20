import { useEffect } from 'react';

declare const window: typeof globalThis & {
  Kakao: any;
};

export default function KakaoSharePage() {
  const url = window.location.href;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.0.1/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onClickKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Nostrss',
        description: '카카오 공유하기',
        imageUrl:
          'https://raw.githubusercontent.com/nostrss/nostrss.github.io/master/assets/favicon-32x32.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div>
      <button type='button' onClick={onClickKakaoShare}>
        <img
          src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
          alt='kakao_share'
        />
      </button>
    </div>
  );
}
