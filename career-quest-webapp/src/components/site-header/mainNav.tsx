'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { loggedinNavigationLinks, navigationLinks } from './navigations';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useLogoutMutation } from '@/store/auth/api';

export default function MainNav() {
    const auth = useAuth();

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('authToken');
            window.location.reload();
        } catch (error: any) {
            console.error('Logout failed', error);
            alert(error.data?.message || 'Logout failed');
        }
    };

    const links = auth.isLoggedIn ? loggedinNavigationLinks : navigationLinks;

    return (
        <div className="mr-4 hidden gap-2 md:flex md:justify-between w-full">
            {/* Logo */}
            <Link href="/">
                <Image
                    src="/logo_white_large.png"
                    height={40}
                    width={150}
                    alt="Guhuza"
                />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
                {links.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <Button
                            variant="default"
                            className="bg-[#111111] text-white hover:bg-[#333333]"
                        >
                            {item.displayName}
                        </Button>
                    </Link>
                ))}

                {/* Logout Button */}
                {auth.isLoggedIn && (
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="text-white hover:bg-red-700"
                    >
                        Log out
                    </Button>
                )}
            </div>
        </div>
    );
}
