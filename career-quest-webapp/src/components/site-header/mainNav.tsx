import Link from 'next/link';
import { Button } from '../ui/button';
import { navigationLinks } from './navigations';
import Image from 'next/image';

export default function MainNav() {
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
                {navigationLinks.map((item, index) => (
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
            </div>
        </div>
    );
}
