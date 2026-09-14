'use client'

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import Wrapper from "@/components/primitives/Wrapper";
import BackButton from "@/components/primitives/BackButton";
import UserMenu from "@/components/chrome/dashboard/UserMenu";

const Header = () => {
  const pathName = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 150], [0, 1]);

  const getPageTitle = () => {
    if (pathName === "/dashboard") return "Home";

    const segments = pathName.split("/");
    const lastSegment = segments[segments.length - 1];

    if (lastSegment) {
      return lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Shelf";
  };

  return (
    <div className="mt-12 w-full">
      <Wrapper className="flex items-center justify-between w-full">
        <AnimatePresence mode="wait">
          <motion.h1
            key={pathName}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 7 }}
            transition={{ duration: 0.2 }}
            className="text-3xl font-medium"
          >
            {getPageTitle()}
          </motion.h1>
        </AnimatePresence>

        <UserMenu />

        {pathName !== "/dashboard" && pathName !== "/dashboard/shelf" && (
          <motion.div
            style={{ opacity }}
            className="fixed top-0 left-0 w-full p-3 bg-transparent backdrop-blur-md z-50 duration-200"
          >
            <Wrapper className="flex items-center justify-between relative p-1">
              <BackButton label="" />
              <h3 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium">
                {getPageTitle()}
              </h3>
            </Wrapper>
          </motion.div>
        )}
      </Wrapper>
    </div>
  );
};

export default Header;
