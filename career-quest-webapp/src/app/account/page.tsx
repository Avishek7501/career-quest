'use client';

import React, { useEffect, useState } from 'react';
import {
    useGetProfileQuery,
    useUpdateProfileMutation
    // useUpdatePasswordMutation,
    // useLogoutMutation
} from '@/store/api/api';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { setToken } from '@/store/auth/slice';
import { useGetStatusQuery } from '@/store/auth/api';

export default function AccountPage() {
    // const dispatch = useDispatch();
    // const router = useRouter();

    const { data: userData } = useGetStatusQuery();

    const { data: profile, isLoading: loadingProfile } = useGetProfileQuery(
        userData?.user?.UserId
    );
    console.log(profile);
    const [
        updateProfile
        //, { isLoading: updatingProfile }
    ] = useUpdateProfileMutation();
    // const [updatePassword, { isLoading: updatingPassword }] =
    //     useUpdatePasswordMutation();
    // const [logout] = useLogoutMutation();

    const [profileData, setProfileData] = useState({
        username: profile?.Username || '',
        email: profile?.Email || '',
        address: profile?.Address || '',
        phone: profile?.Phone || '',
        gender: profile?.Gender || ''
    });

    // const [passwordData, setPasswordData] = useState({
    //     currentPassword: '',
    //     newPassword: ''
    // });

    useEffect(() => {
        if (profile) {
            setProfileData({
                username: profile?.Username || '',
                email: profile?.Email || '',
                address: profile?.Address || '',
                phone: profile?.Phone || '',
                gender: profile?.Gender || ''
            });
        }
    }, [profile]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setPasswordData((prev) => ({ ...prev, [name]: value }));
    // };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(profileData).unwrap();
            alert('Profile updated successfully!');
        } catch {
            alert('Failed to update profile.');
        }
    };

    // const handlePasswordSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await updatePassword(passwordData).unwrap();
    //         alert('Password updated successfully!');
    //     } catch (error) {
    //         alert('Failed to update password.');
    //     }
    // };

    // const handleLogout = async () => {
    //     try {
    //         await logout().unwrap();
    //         dispatch(setToken(null)); // Clear Redux token
    //         router.push('/auth/login'); // Redirect to login
    //     } catch (error) {
    //         alert('Failed to log out.');
    //     }
    // };

    if (loadingProfile) return <p>Loading...</p>;

    return (
        <div className="w-full mx-auto p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Account</h2>

            {/* Profile Update Section */}
            <form onSubmit={handleProfileSubmit} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">My Profile</h3>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded"
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        disabled
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        disabled
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Gender
                    </label>
                    <input
                        type="text"
                        name="gender"
                        disabled
                        value={profileData.gender}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div> */}
                {/* <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={updatingProfile}
                >
                    {updatingProfile ? 'Updating...' : 'Update Profile'}
                </button> */}
            </form>

            {/* Password Update Section */}
            {/* <form onSubmit={handlePasswordSubmit} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Update Password</h3>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    disabled={updatingPassword}
                >
                    {updatingPassword ? 'Updating...' : 'Update Password'}
                </button>
            </form> */}

            {/* Logout Button */}
            {/* <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Log Out
            </button> */}
        </div>
    );
}
