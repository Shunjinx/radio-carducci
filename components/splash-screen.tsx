"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000) // Hide after 2 seconds

    return () => clearTimeout(timer) // Cleanup on unmount
  }, [])

  return (
    isVisible && (
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="w-32 h-32 mb-6 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <Image
            src="/images/logo-radio-carducci-2.png"
            alt="Radio Carducci Logo"
            fill
            className="object-contain"
            style={{ opacity: 1 }}
          />
        </motion.div>
        <motion.h1
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        >
          Radio Carducci
        </motion.h1>
      </motion.div>
    )
  )
}

export default SplashScreen
