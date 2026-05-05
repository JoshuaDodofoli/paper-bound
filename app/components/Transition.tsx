'use client'

import { animate } from "motion/react"
import { TransitionRouter } from "next-transition-router"

const Transition = ({ children }: { children: React.ReactNode }) => {
    return (
        <TransitionRouter
            auto
            leave={(next) => {
                const el = document.querySelector('#page-transition-wrapper')
                if (!el) return next()
                animate(el, 
                    { opacity: [1, 0], y: ["0%", "7px"] }, 
                    { duration: 0.2, ease: "easeIn" }
                 ).then(next)
            }}
            enter={(next) => {
                setTimeout(() => {
                    const el = document.querySelector('#page-transition-wrapper')
                    if (!el) return next()
                    animate(el, 
                        { opacity: [0, 1], y: ["7px", "0%"] }, 
                        { duration: 0.3, ease: "easeOut" }
                    ).then(next)
                }, 50)
            }}
        >
            <div id="page-transition-wrapper" className="min-h-screen">
                {children}
            </div>
        </TransitionRouter>
    )
}

export default Transition