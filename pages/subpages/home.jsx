import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Welcome() {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const checkTelegramSDK = () => {
      if (window.Telegram?.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
          setUsername(user.username);
          setProfilePic(user.photo_url);
        }
      } else {
        console.error("Telegram SDK not loaded");
      }
    };

    if (window.Telegram) {
      checkTelegramSDK();
    } else {
      window.addEventListener('load', checkTelegramSDK);
    }

    return () => window.removeEventListener('load', checkTelegramSDK);
  }, []);

  return (
    <div>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {profilePic && <img src={profilePic} alt="Profile Picture" />}
      <p>{username}</p>
      <p>{profilePic}</p>
    </div>
  );
}
