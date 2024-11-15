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
            await logout();
            localStorage.removeItem('authToken'); // Clear the token from localStorage
            window.location.reload();
        } catch (error: any) {
            console.error('Logout failed', error);
            alert(error.data?.message || 'Logout failed');
        }
    };

    return (
        <div className="mr-4 hidden gap-2 md:flex md:justify-between w-full">
            <Link href="/">
                <Image
                    src="/logo_white_large.png"
                    height={40}
                    width={150}
                    alt="Guhuza"
                />
            </Link>
            <div>
                {(auth.isLoggedIn
                    ? loggedinNavigationLinks
                    : navigationLinks
                ).map((item, index) => (
                    <Button
                        key={index}
                        variant="default"
                        className="bg-[#111111]"
                    >
                        <Link key={index} href={item.href}>
                            {item.displayName}
                        </Link>
                    </Button>
                ))}
                {auth.isLoggedIn && (
                    <Button variant="destructive" onClick={handleLogout}>
                        Log out
                    </Button>
                )}
            </div>
        </div>
    );
}
