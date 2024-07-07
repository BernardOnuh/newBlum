import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link'
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";

const Welcome = () => {
    const [score, setScore] = useState(33333);
    const [username, setUsername] = useState("Anon");
    const router = useRouter();

    const handlePlayClick = () => {
        router.push('/subpages/play'); // Navigate to the play page
    };

    const handleTask = () => {
        router.push('/subpages/task'); // Navigate to the play page
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Checking Telegram WebApp initialization...");
                console.log(window.Telegram);
                const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
                console.log("User data fetched from Telegram:", user);
                if (user) {
                    setUsername(user.username || "Anon");
                } else {
                    console.warn("No user data found in Telegram WebApp");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            fetchUserData();
        } else {
            console.error("Telegram WebApp is not available");
        }
    }, []);

    return (
        <div className='flex flex-col h-screen'>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

            <div className='bg  rounded-md border-[#1F7DF1] border-2 py-5 '>
                    
                   <div className='text-center text-black text-2xl font-semibold'>TASKS</div>
                </div>

            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>    
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='flex mx-4 border-b border-[#1F7DF1]'>
                <div className="w-[20%] my-auto"><Image src="/diamond.png" width={30} height={30}/></div>
                <div className='text-black font-semibold w-[60%] text-center my-auto'> Follow Account</div>
                <div className='w-[20%] my-2'>
                    <div className="text-sm bg-[#1F7DF1] text-center rounded-2xl py-[5px] my-auto">Claim</div></div>
            </div>   
            <div className='bg-[#1F7DF1] text-white py-3 fixed bottom-0 left-0 w-full'>
                <div className='flex justify-around'>
                    <Link href="/">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <GoHome size={24} />
                        <span className='text-[10px]'>Home</span>
                    </div>
                    </Link>
                    <Link href="/subpages/task">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <AiOutlineUnorderedList size={24} />
                        <span className='text-[10px]'>Tasks</span>
                    </div>
                    </Link>
                    <Link href="/subpages/task">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <HiOutlineUserGroup size={24} />
                        <span className='text-[10px]'>Frens</span>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;