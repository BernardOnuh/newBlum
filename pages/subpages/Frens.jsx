import React, { useState, useEffect } from "react";
import Image from "next/image";
import diamond from "@/public/diamond.png";
import Script from 'next/script';
import Link from "next/link";
import { AiFillHome, AiOutlineUnorderedList } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";

const Invite = () => {
  const [username, setUsername] = useState('bernardblockchain');
  const [inviteData, setInviteData] = useState(null);
  const inviteLink = `https://t.me/Ton_Diamond_bot?start=${username}`;

  useEffect(() => {
    // Fetch the Telegram user data and set the username
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user) {
      setUsername(user.username || 'bernardblockchain');
    }

    // Fetch invite data from the API
    const fetchInviteData = async () => {
      try {
        const response = await fetch(`https://ton-diamonddb.onrender.com/api/ton-diamond/user/${username}`);
        const data = await response.json();
        if (response.ok) {
          setInviteData(data);
        } else {
          console.error('Failed to fetch invite data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching invite data:', error);
      }
    };

    fetchInviteData();
  }, [username]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hello Fren',
        text: 'Join me on this amazing app!',
        url: inviteLink,
      }).catch(err => {
        console.error('Error sharing: ', err);
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="p-5 m-auto mb-10">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <div className="flex justify-center items-center flex-col h-auto">
        <span className="pt-5 pb-1 text-3xl">👨‍👩‍👧‍👦</span>
        <h1 className="py-5 text-gray-800 font-bold text-lg">Invite Friends</h1>
        <div className="rounded-xl flex flex-col border border-[#1F7DF1] mb-5 gap-4 items-center justify-center p-5">
          <div className="flex flex-row">
            <Image src={diamond} className="w-8" alt="Diamond" />
            <h1 className="flex text-gray-800 font-bold gap-2 text-xl">{inviteData ? inviteData.referralBalance : 0}</h1>
          </div>
          <div
            onClick={copyToClipboard}
            className="mx-auto text-center bg-[#1F7DF1] text-white my-2 font-semibold text-md py-2 px-7 rounded-full hover:bg-black cursor-pointer"
          >
            Copy link
          </div>
        </div>
        <p className="text-sm text-gray-800 font-semibold text-center mb-5">
          Score 10% from buddies + 2.5% from their referrals. <br /> Get a play
          pass 🎫 for each friend.
        </p>

        <div className="flex flex-col border border-[#1F7DF1] rounded-lg p-5 text-start w-[70vw] text-gray-800">
          <p className="font-bold text-xl">{inviteData ? inviteData.invitedUsers.length : 0} frens</p>
          {inviteData && inviteData.invitedUsers.map((invitedUser) => (
            <div key={invitedUser.userId} className="flex items-center justify-between w-full border-b border-[#1F7DF1] py-4">
              <div className="flex items-center">
                <span className="flex mx-3 items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white">
                  {invitedUser.username.charAt(0)}
                </span>
                <p>{invitedUser.username}</p>
              </div>
              <h2 className="text-end flex">{invitedUser.score} <Image src={diamond} className="w-8" alt="Diamond" /></h2>
            </div>
          ))}
        </div>
        <div
          onClick={shareLink}
          className="mx-auto text-center w-[60vw] bg-[#1F7DF1] text-white my-2 font-semibold text-md py-2 rounded-full hover:bg-black cursor-pointer"
        >
          Share
        </div>
      </div>

      {/* footer */}

      <div className="bg-[#1F7DF1] text-white py-3 fixed bottom-0 left-0 w-full">
        <div className="flex justify-around">
          <Link href="/">
            <div className="cursor-pointer flex flex-col items-center">
              <GoHome size={24} />
              <span className="text-[10px]">Home</span>
            </div>
          </Link>
          <Link href="/subpages/task">
            <div className="cursor-pointer flex flex-col items-center">
              <AiOutlineUnorderedList size={24} />
              <span className="text-[10px]">Tasks</span>
            </div>
          </Link>
          <Link href="/subpages/Frens">
            <div className="cursor-pointer flex flex-col items-center">
              <HiOutlineUserGroup size={24} />
              <span className="text-[10px]">Frens</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invite;
