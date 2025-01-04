import Image from 'next/image'

export default function Title() {
    return (
        <div className='absolute top-[16%] left-2 md:top-[16%] lg:top-[15.5%] xl:top-[15.5%] sm:left-[10%] flex'>
            <h1 className="text-5xl font-bold z-10 text-gray-900 dark:text-white lg:text-6xl drop-shadow-[1px_1px_5px_rgba(255,255,255,0.5)] dark:drop-shadow-[1px_1px_5px_rgba(0,0,0,0.5)]">
                isGlitch.com
            </h1>
            <Image 
                className='z-10 drop-shadow-[1px_1px_5px_rgba(255,255,255,0.5)] dark:drop-shadow-[1px_1px_5px_rgba(0,0,0,0.5)]'
                src="/logo.svg"
                alt="isGlitch.com"
                width={75}
                height={75}
                priority
            />
        </div>
    )
}