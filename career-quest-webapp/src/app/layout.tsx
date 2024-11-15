import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/site-header';

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
                <SiteHeader />
                {children}
            </body>
        </html>
    );
}
