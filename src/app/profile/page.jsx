'use client'

import { authClient } from '@/lib/auth-client';
import { Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { UpdateProfile } from '../components/UpdateProfile';

const Profile = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    // Loading state handle korar jonno
    if (userData.isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center animate__animated animate__fadeInDown">
            <Card className="max-w-2xl w-full p-8 shadow-2xl border border-gray-100 rounded-[2.5rem] bg-white">
                <div className='flex flex-col items-center'>
                    
                    {/* Profile Image with Brand Gradient Glow */}
                    <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 mb-6 shadow-lg">
                        <div className="bg-white p-1 rounded-full">
                            <Image 
                                className='rounded-full object-cover shadow-inner' 
                                src={user?.image || 'https://via.placeholder.com/160'} 
                                alt='user image' 
                                height={160} 
                                width={160}
                                priority
                            />
                        </div>
                    </div>

                    {/* User Name & Badge */}
                    <div className="text-center">
                        <h2 className='text-3xl font-black text-gray-900 mb-1 tracking-tight'>
                            {user?.name}
                        </h2>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                            Verified Member
                        </span>
                    </div>
                    
                    {/* Custom Professional Divider */}
                    <div className="w-full flex items-center gap-4 my-8">
                        <div className="flex-grow h-[1px] bg-gray-100"></div>
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Profile Details</span>
                        <div className="flex-grow h-[1px] bg-gray-100"></div>
                    </div>

                    {/* Information Grid */}
                    <div className="w-full space-y-3 mb-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-4 bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-2xl border border-transparent hover:border-gray-200">
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-0">Email Address</span>
                            <span className="text-gray-800 font-medium">{user?.email}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-4 bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-2xl border border-transparent hover:border-gray-200">
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-0">User ID</span>
                            <span className="text-gray-400 font-mono text-xs">{user?.id?.slice(0, 18)}...</span>
                        </div>
                    </div>

                    {/* Update Profile Component Wrapper */}
                    <div className="w-full">
                        <UpdateProfile />
                    </div>

                    <p className="mt-6 text-gray-400 text-[11px] text-center">
                        Member since 2026 • SkillSphere Learning Platform
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Profile;