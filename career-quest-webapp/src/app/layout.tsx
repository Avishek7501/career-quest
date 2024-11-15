import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/site-header';
import ReduxProvider from '@/components/hocs/redux-provider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Guhuza - Career Quest',
    description: 'Guhuza - Career Quest'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
            >
                <ReduxProvider>
                    <SiteHeader />
                    <div className="flex flex-col w-full min-h-[calc(100vh-192px)]">
                        {children}
                    </div>
                    {/* Footer */}
                    <footer className="w-full bg-blue-800 text-white py-4 h-28 flex items-center">
                        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center text-center">
                            <div className="font-semibold text-lg">Guhuza</div>
                            <p className="text-sm mt-1">
                                Copyright ©2024 Guhuza
                            </p>
                        </div>
                    </footer>
                </ReduxProvider>
            </body>
        </html>
    );
}
