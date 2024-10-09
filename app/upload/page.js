import { Cover } from '@/components/ui/cover'
import { WavyBackground } from '@/components/ui/wavy-background'
import { IconBrandGithub, IconBrandGoogle, IconBrandInstagram } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <WavyBackground className="max-w-4xl  mx-auto pb-40">

            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent">
                <h1 className="text-4xl font-semibold mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                    <Cover className={"text-2xl"}>Join Google ClassRoom</Cover>
                </h1>

                <Link href="/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Back</Link>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <div className='flex justify-center flex-col gap-2'>
                    <div className="flex justify-center items-center">
                        <a href="https://classroom.google.com/c/NzIyNzI3NzM1MjUw?cjc=ulkf6lj" target="_black">
                            <Cover className="flex justify-start items-center gap-1 w-full">
                                <IconBrandGoogle size={20} className="text-neutral-300" />
                                click and join DBMS Class
                            </Cover>
                        </a>
                    </div>

                    <p className="text-center text-sm max-w-sm mt-2 text-neutral-300">
                        <span className="font-extrabold">Assigments</span>
                    </p>
                    <a href="https://classroom.google.com/c/NzIyNzI3NzM1MjUw/a/NzIyNzM5ODM0Njcz/details" target="_black" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">CLick and submit Project Demo Report</a>
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <div className='flex justify-center flex-col gap-2'>
                    <p className="text-center text-sm max-w-sm mt-2 text-neutral-300">
                        <span className="font-extrabold">Soon</span>
                    </p>
                </div>
            </div>
        </WavyBackground>
    )
}

export default Page