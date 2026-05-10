import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Library } from 'lucide-react'

interface CollectionCardProps {
    collectionName: string;
    viewMode?: 'grid' | 'list';
}

const CollectionCard = ({ collectionName, viewMode = 'grid' }: CollectionCardProps) => {
    const isList = viewMode === 'list';

    return (
        <motion.div
            layout
            className={`w-full relative transition-all duration-500 group ${isList ? 'h-24' : ''}`}
        >
            <div className={`flex w-full bg-ash backdrop-blur-[2px] border border-stone/20 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${isList ? 'h-full flex-row items-center px-4 gap-6' : 'flex-col aspect-3/2 pt-5'}`}>

                {!isList && (
                    <div className="flex flex-col w-full px-5 z-10">
                        {/* Meta Row */}
                        <div className="flex items-start justify-between text-xs font-sans text-dark-grey/60 font-medium mb-4">
                            {/* <div className="flex items-center gap-1.5">
                                <Clock size={12} className="opacity-70" />
                                <span>2 days ago</span>
                            </div> */}
                            <div className="flex items-center gap-1.5 bg-stone/60 px-2 py-1 rounded-2xl">
                                <Library size={11} className="opacity-70" />
                                <span className="font-bold">14</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-dark-grey font-sans font-bold text-xl md:text-2xl tracking-tight leading-tight line-clamp-1">{collectionName}</h3>
                            {/* <span className="text-[12px] font-sans opacity-50 mt-1 font-medium">Ready for new reading sessions!</span> */}
                        </div>
                    </div>
                )}

                <div className={`relative flex justify-center shrink-0 ${isList ? 'w-16 h-16 items-center' : 'w-full flex-1 items-end mt-4'}`}>
                    <CollectionCardCover isList={isList} />
                </div>

                {isList && (
                    <div className={`relative z-10 flex-1 w-full text-left`}>
                        <div className="flex flex-col items-start justify-center gap-2">
                            <h3 className="text-dark-grey font-sans font-bold text-lg leading-tight line-clamp-1">{collectionName}</h3>
                            <div className="flex items-center gap-1.5 bg-stone/60 px-2 py-0.5 rounded-2xl">
                                <Library size={11} className="opacity-70" />
                                <span className="font-bold text-xs font-sans text-dark-grey/60">14</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

const BookItem = ({ color, rotation, x, zIndex, size, isList }: { color: string, rotation: number, x: number, zIndex: number, size: string, isList: boolean }) => (
    <motion.div
        initial={false}
        animate={{
            rotate: rotation,
            x: x,
            scale: 1,
            y: isList ? 0 : 15
        }}
        className={`absolute ${size} aspect-3/4 rounded-r-sm rounded-l-[3px] shadow-lg transition-shadow duration-300 pointer-events-none ${isList ? '' : 'bottom-0'}`}
        style={{
            backgroundColor: color,
            zIndex: zIndex,
            transformOrigin: isList ? 'center' : 'bottom center'
        }}
    >
        {/* Spine shadow */}
        <div className="absolute left-0 top-0 w-[20%] h-full bg-linear-to-r from-black/15 via-transparent to-transparent rounded-l-[3px]" />

        {/* Binding detail */}
        <div className="absolute left-[12%] top-0 w-px h-full bg-black/5" />

        {/* Edge highlight */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/binding-dark.png')]" />
    </motion.div>
)

const CollectionCardCover = ({ isList }: { isList: boolean }) => {
    const baseSize = isList ? "w-8" : "w-16 md:w-20";
    const centerSize = isList ? "w-10" : "w-20 md:w-24";
    const offset = isList ? 10 : 35;

    return (
        <div className={`relative w-full h-full flex ${isList ? 'items-center' : 'items-end'} justify-center pointer-events-none`}>
            <BookItem
                color="#454545"
                rotation={-18}
                x={-offset}
                zIndex={0}
                size={baseSize}
                isList={isList}
            />
            <BookItem
                color="#E4DED2"
                rotation={18}
                x={offset}
                zIndex={10}
                size={baseSize}
                isList={isList}
            />
            <BookItem
                color="#fffb00"
                rotation={0}
                x={0}
                zIndex={20}
                size={centerSize}
                isList={isList}
            />
        </div>
    )
}

export default CollectionCard