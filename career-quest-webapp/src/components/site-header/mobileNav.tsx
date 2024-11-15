'use client';

import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { navigationLinks } from './navigations';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* This button will trigger open the mobile sheet menu */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader className="text-start p-0 mb-2 space-y-0">
                    <SheetTitle className="p-0 m-0">Guhuza</SheetTitle>
                    <SheetDescription className="p-0 m-0">
                        Career Quest
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col items-start">
                    {navigationLinks.map((item, index) => (
                        <Button
                            key={index}
                            variant={
                                pathname === item.href ? 'default' : 'ghost'
                            }
                            className={cn('w-full')}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Link href={item.href} passHref legacyBehavior>
                                <a className=" w-full h-full text-start flex items-center">
                                    {item.displayName}
                                </a>
                            </Link>
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
