import cs from "classnames";
import Image from "next/image";
import logo from "../assets/images/logo.png"
import { Button } from "@mantine/core";

export function NavBar() {
    return (
        <div className={cs("absolute inset-0 py-6 px-12", 'flex items-start justify-center gap-20')}>
             <Image src={logo} alt="logo" width={60} />
            <nav className={cs('h-16 w-full', 'border border-zinc-400/20', 'bg-zinc-700/40 backdrop-blur-md', 'rounded-full' )}>
                <div className={cs('bg-gray-800/0 backdrop-blur-lg', 'rounded-2xl', 'p-4', 'flex justify-end items-center gap-4')}>
                   <Button variant="filled" color="#2da1e4" size="xs" radius="xl">එක් වන්න</Button>
                </div>

            </nav>
        </div>
    )
}