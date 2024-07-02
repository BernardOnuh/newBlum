import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Welcome = () => {
    const [score, setScore] = useState(33333);
    const router = useRouter();

    const handlePlayClick = () => {
        router.push('/subpages/play'); // Navigate to the play page
    };

    return (
        <div className='h-screen'>
            <div>
                <div className="flex justify-center items-start">
                    <Image src="/Blum.jpg" alt="Logo" width={100} height={100} className="mt-2 rounded-full" />
                </div>
                <div className='font-semibold text-lg mt-2 text-center'>Welcome Anon</div>
            </div>
            <div className="flex justify-center items-start mt-4">
                <Image src="/blum.png" alt="Logo" width={50} height={50} className="rounded-full" />
                <div className='text-center my-auto font-bold text-2xl text-[#ff6ec7]'>{score}</div>
            </div>

            <div className='bg w-[90vw] rounded-md border-[#ff6ec7] border-2 py-3 my-4'>
                <div className='flex justify-center'>
                    <Image src="/pinkblum.png" alt="Logo" width={50} height={50} className="rounde" />
                </div>
                <div
                    className='mx-auto text-center w-[30vw] bg-white text-black font-semibold text-md py-2 rounded-full hover:bg-[#ff6ec7] cursor-pointer'
                    onClick={handlePlayClick}
                >
                    Play
                </div>
            </div>

            <div className='mx-auto text-center w-[90vw] bg-[#ff6ec7] text-black font-semibold text-md py-2 rounded-md mt-3 hover:bg-black hover:text-white cursor-pointer'>
                Start Farming
            </div>
        </div>
    );
};

export default Welcome;
