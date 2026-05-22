'use client'

import { authClient } from '@/lib/auth-client';
import { Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { UpdateProfile } from '../components/UpdateProfile';

const Profile = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    if (userData.isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            {/* Card with Dark Mode support */}
            <Card className="max-w-xl w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-800 rounded-[2rem] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                
                {/* Mentorify Branding Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">My Profile</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your MediQueue account</p>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 tracking-wider uppercase">Mentorify</span>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    {/* Profile Image with Ring */}
                    <div className="relative p-1 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mb-6 shadow-lg">
                        <Image 
                            className='rounded-full object-cover border-4 border-white dark:border-gray-900' 
                            src={user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                            alt='user image' 
                            height={120} 
                            width={120}
                            priority
                        />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{user?.name}</h2>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">{user?.email}</p>
                    </div>

                    {/* Information Stats Grid */}
                    <div className="w-full grid grid-cols-1 gap-3 mb-8">
                        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                            <span className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">User ID</span>
                            <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{user?.id?.slice(0, 12)}...</span>
                        </div>
                    </div>

                    {/* Update Profile Component */}
                    <div className="w-full">
                        <UpdateProfile />
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 w-full text-center">
                        <p className="text-gray-400 dark:text-gray-600 text-[10px] uppercase tracking-widest">
                            MediQueue Tutor Finding Platform © 2026
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;