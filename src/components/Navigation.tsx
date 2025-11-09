import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(!isOpen)

    return (
        <motion.aside
        className='
        h-2/12
        flex
        flex-col
        p-5
        '>
            <motion.h1
            onClick={handleOpen}>
                N
            </motion.h1>
            <motion.nav
            style={{ display: `${isOpen ? 1 : 0 }` }}
            className='
                flex 
                flex-col 
                h-2-12
                w-1/12
                justify-center
                items-center
                gap-8
                p-15'
            animate={{ x: isOpen ? 0 : -200 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/Favorites'>Favorites</NavLink>
                <NavLink to='/About'>About</NavLink>
            </motion.nav>
        </motion.aside>
    )
}