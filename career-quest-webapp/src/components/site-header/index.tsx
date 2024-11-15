import MainNav from './mainNav';
import MobileNav from './mobileNav';

export default function SiteHeader() {
    return (
        <header className="w-full shadow">
            <div className="h-20 px-4 bg-[#111111] text-white">
                <div className="flex items-center md:px-12 w-full h-full">
                    <MainNav />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
