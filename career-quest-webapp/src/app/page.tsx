import Image from 'next/image';

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {/* Logo or Main Image */}
                <Image
                    className="dark:invert rounded-lg"
                    src="/welcomepage.png" // Image path in public folder
                    alt="Guhuza - Recruiting Outside the Box"
                    width={600}
                    height={400}
                    priority
                />

                {/* Text Section */}
                <h2 className="text-2xl font-bold text-blue-600 mb-2">
                    Guhuza
                </h2>
                <p className="text-blue-600 text-center sm:text-left">
                    Simply add your resume or job and be instantly connected!
                </p>
            </main>
        </div>
    );
}
