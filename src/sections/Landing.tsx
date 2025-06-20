'use client';
import { motion } from 'framer-motion';
import BackgroundSpheres from '@/components/animation/BackgroundSpheres';

export default function Landing({isDark}: {isDark: boolean}) {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-indigo-400 via-teal-200 to-purple-200
        dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900 flex flex-col">
          <BackgroundSpheres isDark={isDark} />
      {/* Top-centered logo */}
    <motion.div 
    initial={{ opacity: 0, translateY: -20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
     className="absolute inset-x-0 top-0 flex justify-center items-start">
       <svg       xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="400"
      viewBox="0 0 1600 1600"
      fill="currentColor"
      className="mx-auto mt-0 w-52 h-52"><path d="M241.5 644.6c-24.5 4.4-44.6 13.2-60.4 26.4-25.2 21.2-35.5 53.5-29 91.6 3 18 17.5 35.3 38.4 45.6 3.9 2 12.9 5.7 20 8.3 23.7 8.6 36.6 16.1 41.4 23.8 1.1 1.9 2.1 3.6 2.1 3.9 0 .3-16.1.4-35.7.4-43.8-.1-54.1 1.2-61.2 7.7-8.8 8.1-8 26.1 2.1 46 11.2 22.4 28.6 39.7 49.5 49.4 23.6 10.9 57 12.3 83.2 3.6 38-12.7 63-39.7 70.1-75.7 1.5-7.6 1.5-28.1.1-36.6-1.6-8.7-2.7-11.4-7.7-18.5-9.4-13.5-26.5-24.6-58.9-38.1-4.9-2.1-12.1-5.6-16-7.8-7.1-4.1-19.5-15.3-19.5-17.8 0-1.1 6.8-1.3 37.7-1.3 48.7 0 55.8-1.2 62-10.7 2.6-3.9 2.8-4.9 2.7-14.2 0-8.6-.5-11.3-3-18.2-8.5-23-26.6-44.7-47.1-56.5-8.6-4.9-23.9-10.3-33.3-11.8-9-1.5-27.9-1.2-37.5.5zm46.5 6.3c27.4 8 51.2 28.8 63.6 55.7 8.2 17.7 8.6 33.9.9 39-5.9 3.8-12.9 4.6-45.9 5.1-17.6.3-35.7.2-40.4-.2l-8.5-.7.7-5.6c.4-3 2.9-12.3 5.6-20.7 5.3-16.1 5.9-19.9 3.5-24.4-2.6-5.1-8.9-6.1-23-3.6-23.9 4.3-39.8 22-42.4 47.3l-.6 6.3-11.3.5c-13.8.5-23.5 2.6-29.5 6.4l-4.4 2.8-.7-6.1c-3-29.3 5-54.3 23.3-72.7 15-15 34.2-24.5 60.6-30.1 12.7-2.6 37.7-2.1 48.5 1zm-25.6 49.7c2.5 2.4 2 6-2.9 20.6-2.5 7.4-5 16.9-5.7 21.2l-1.2 7.6H207v-4.8c0-16 10.3-33.3 24-40.2 10.3-5.2 28.2-7.7 31.4-4.4zm-58.9 60.9c3.9 12.6 9.2 21.1 23 37 10.1 11.5 14.8 17.6 20.1 26 3.3 5.3 3.5 5.8 1.3 4.4-11.1-7.3-19.1-11-39.3-18.4-20.2-7.3-34.4-16.8-42.9-28.7-4.5-6.3-7.7-12.8-7.7-15.5 0-2.5 5.7-7.1 10.9-8.8 6.5-2.1 15.9-3.3 25-3.1l7.4.1 2.2 7zm51.9-.3c3 10.7 7.3 18.3 20.3 35.6 14.6 19.4 23.1 31.9 27.9 41.4 1.9 3.7 3.4 7 3.4 7.3 0 .3-10.5.5-23.3.5h-23.4l-1.2-5.3c-2.6-11.3-13-27.7-29-45.7-8.8-9.9-12.2-14.3-16-21.1-2.8-5-7.1-15.9-7.1-18.1 0-.4 10.5-.8 23.3-.8h23.4l1.7 6.2zm28.2 21.2c3.8 1.9 12.8 6 20.1 9 25.2 10.3 42.8 23.4 50.2 37.2 2.7 4.9 2.6 5.6-.5 9.3-3.9 4.7-13.1 7.2-28.4 7.8l-12.5.5-2.8-6.5c-4.1-9.4-12.1-21.7-26.7-41.2-11.7-15.7-19-26.3-19-27.8 0-.4 2.8 1.4 6.3 3.8s9.4 6 13.3 7.9zm74.9 68.3c3.2 41.5-20.4 77.1-62 93.6-15.2 6-27.2 8-46 7.4-17.4-.5-27.1-2.6-40.3-8.7-28.7-13.3-54.2-48.1-54.2-74 0-11.2 4.6-15.9 18-18.2 10.2-1.8 79.4-1.8 81.1-.1 1.8 1.8-.3 12-5.7 28-5.3 15.9-5.6 20.3-1.5 24.4 2.7 2.7 3.5 2.9 10.4 2.9 8.8 0 20.8-2.9 28-6.7 7.6-4.1 15.8-12.6 19.5-20.4 3.5-7.4 6.2-17.4 6.2-23.5v-4.1l12.8-.6c14.1-.6 22.9-2.6 28.2-6.2 1.9-1.3 3.8-2.4 4.1-2.4.4-.1 1 3.8 1.4 8.6zm-56.1-.1 4.6.7v4.1c0 15.6-10.5 33.3-23.8 40-9.6 4.9-28.9 7.5-32 4.4-2.1-2.1-1.3-6.7 3.3-20.9 2.5-7.6 5-17.2 5.7-21.4l1.2-7.5h18.1c10 0 20.3.3 22.9.6zM451.5 740.5c-.5.2-3.5 1.1-6.5 2-8.5 2.6-14.7 7-18.1 12.9-2.7 4.8-2.9 5.7-2.9 16.6 0 13.7 1.4 17.5 8.2 23.5 8.7 7.7 9.6 7.8 51.3 8.5 34 .5 37.2.7 39.8 2.4 5 3.4 4.8 10-.6 14-2.8 2.1-3.9 2.1-50.8 2.4l-47.9.3v22l52.3-.3 52.2-.3 5.5-2.6c7-3.3 12.5-8.1 15.1-13.2 1.8-3.4 2-5.5 1.7-16.7-.3-12.4-.4-13-3.3-17.2-3.5-4.9-8.9-8.7-16-11.3-4.4-1.6-9.5-1.9-41.8-2.4l-36.9-.6-2.4-2.8c-2.6-3.1-2.9-5.2-1.4-9.2 2-5.3 3.7-5.5 55-5.5h47v-23l-49.2.1c-27.1 0-49.7.2-50.3.4zM575.8 748.7c4.4 4.9 16.1 17.8 26 28.8l18.1 20 .1 23.7V845h24v-47.7l25.5-28.2c14-15.6 25.5-28.5 25.5-28.7 0-.2-6.9-.4-15.4-.4h-15.5l-15.7 17.2c-8.7 9.5-16.1 17.4-16.4 17.6-.3.1-7.7-7.6-16.4-17.3L599.7 740h-31.9l8 8.7zM712 792.5V845h24l.2-40.9.3-40.9 32.8 40.9 32.9 40.9H840V739.9l-11.7.3-11.8.3-.5 40.4-.5 40.4-32.9-40.7-32.8-40.6H712v52.5zM862 751.5V763h46.5c51.3 0 51.9.1 55 6 1.4 2.6 1.6 6.4 1.3 25.4-.3 25.1-.5 25.6-7.7 27.6-4.8 1.3-58.5 1.3-63.3 0-6.1-1.7-8.8-5.9-7.4-11.5 1.1-4.3 5.8-5.9 18.9-6.3l11.7-.4V782h-14.8c-16.5 0-21.7 1.1-29.4 5.9-2.6 1.7-6 4.9-7.5 7.2-2.6 4-2.8 5-3.1 17-.3 11.1-.1 13.2 1.6 16.5 2.8 5.5 7.7 9.8 14.7 13.1l6 2.8 38.9.3c36.4.3 39.2.2 44.7-1.7 8.4-2.8 14.4-7.3 17.9-13.4l3-5.2v-32c0-28.9-.2-32.4-1.9-36-3.6-7.8-11.8-13.4-23.1-15.5-3.1-.6-25.3-1-53.6-1H862v11.5zM1033.5 741.4c-9.8 3.1-16.2 7.8-19.8 14.5l-2.7 4.9V906h24v-66c0-70.6 0-70 5-74.5 2.1-1.9 3.8-2 33.4-2.3 33.6-.2 34.1-.2 38 5.1 1.9 2.6 2.1 4.3 2.4 23.5.2 18.2 0 21.1-1.5 24.2-2.8 5.4-7 7-19 7H1083v22.2l16.8-.4c15.5-.3 17.1-.5 22.2-2.9 7.3-3.4 11.4-7 14-12.3 2-4.2 2.1-5.5 1.8-37.7l-.3-33.4-2.9-4.2c-3.1-4.7-9.5-9.2-17.1-12-4.5-1.6-8.9-1.8-42.5-2-28.3-.2-38.5.1-41.5 1.1zM1184 741.4c-10.8 3.1-18.4 8.5-22.1 15.7-2.5 5-2.7 23.9-.3 29.7 2.7 6.7 9.6 12.3 18.9 15.5 1.8.6 18 1.3 39.5 1.6 32.7.5 36.9.8 39.3 2.4 5 3.3 4.7 10.1-.6 14.1-2.8 2.1-3.9 2.1-50.8 2.4l-47.9.3v22l52.3-.3 52.2-.3 6-2.8c6.9-3.2 11.9-7.6 14.6-12.9 1.6-3.1 1.9-5.8 1.9-15.5 0-13.7-1.4-17.8-7.5-23.2-9.1-8-15.9-9.1-55.9-9.1-30.1 0-32.3-.1-35.3-2-3.9-2.3-5-5.9-3.2-10.1 2.4-5.8 3.1-5.9 54.9-5.9h47v-23l-49.2.1c-36.5.1-50.5.4-53.8 1.3zM1331.4 742c-8.5 2.8-15.3 7.5-18.9 13.4l-3 4.9-.3 31.1c-.2 21.5.1 32.4.9 35.3 1.7 6.1 6.8 11.5 14.1 14.9l6.3 2.9 53.3.3 53.2.3V823h-45.7c-27.2 0-47.2-.4-49.4-1-1.9-.6-4.6-2.2-6-3.6-2.4-2.5-2.4-2.9-2.7-23.4-.2-11.4.1-22.3.6-24.1.5-2.1 2.1-4.2 4.2-5.7 3.2-2.2 3.8-2.2 34.2-2.2 32.8 0 36.4.4 38.7 4.8 1.9 3.5 1.3 7.7-1.5 10.3-2.4 2.2-3.4 2.4-15.5 2.7l-12.9.4v23l16.3-.4c19.1-.5 24.8-2.1 32.1-9.3 6-5.8 8-12.4 7.4-24.9-.3-7.8-.8-9.9-3.2-13.9-3.2-5.6-8.5-9.7-16.5-12.9-5.4-2.2-6.7-2.3-42.6-2.5-34.5-.2-37.4-.1-43.1 1.7zM424 877.9c0 1.6.8 2 4.3 2.3l4.2.3.3 12.7c.2 11.9.4 12.8 2.2 12.8 1.8 0 2-.9 2.2-12.8l.3-12.7 4.3-.3c3.4-.3 4.2-.7 4.2-2.3 0-1.8-.8-1.9-11-1.9s-11 .1-11 1.9zM471 891v15h11.1c10.9 0 11 0 10.7-2.3-.3-2-.9-2.2-8.5-2.5l-8.3-.3V893h6.5c6.3 0 6.5-.1 6.5-2.5s-.2-2.5-6.5-2.5H476v-8h8c7.3 0 8-.2 8-2 0-1.9-.7-2-10.5-2H471v15zM523.2 878c-5.2 3.2-7.4 7.6-6.9 13.8.6 8.8 6.6 14.2 15.5 14.2 6.9 0 13.8-4.4 10.8-6.9-1.1-.9-2.1-.7-4.8.9-3.9 2.3-7.8 2.6-11.6.6-7.7-4-7.2-16.3.9-19.6 3.5-1.5 9.4-.7 12 1.6 1 .9 2.3 1.3 2.8.9 2-1.2 1.1-3.5-2.1-5.5-4.4-2.7-12.2-2.7-16.6 0zM569 891v15h2.5c2.4 0 2.5-.2 2.5-6.5V893h15v6.5c0 5.8.2 6.5 2 6.5 1.9 0 2-.7 2-15 0-14.2-.1-15-2-15-1.6 0-1.9.8-2.2 6.2l-.3 6.3-7.2.3-7.3.3v-6.6c0-6.3-.1-6.5-2.5-6.5H569v15zM656 877.8c-3.8 2-8 8.9-8 13.2 0 4.3 4.2 11.2 8 13.2 6 3.1 15.2 1.9 18.8-2.5 1-1.1.9-1.7-.3-2.7-1.3-1-1.9-1-3.5.5-1 .9-3.9 2-6.4 2.2-4.2.5-4.8.3-8.1-3-2.9-2.9-3.5-4.2-3.5-7.7 0-8.9 10.6-14.3 17.4-8.9 2.2 1.7 2.9 1.9 4.1.9 1.2-1 1.3-1.6.3-2.7-3.6-4.4-12.8-5.6-18.8-2.5zM706.2 878c-4.5 2.8-7.2 7.6-7.2 13 0 8.8 6.4 15 15.6 15 6.2 0 11.1-2.9 13.6-8 5.4-10.6-1.8-22-13.7-22-3.2 0-6.2.7-8.3 2zm13.6 3.4c3.3 1.7 5.5 5.5 5.5 9.6 0 12.2-17.5 15.1-21.3 3.6-3.1-9.6 6.8-17.9 15.8-13.2zM757 891c0 14.2.1 15 2 15 1.8 0 2-.8 2.2-10.8l.3-10.7 4.9 6.2c2.7 3.5 5.2 6.3 5.6 6.3.4 0 2.9-2.8 5.6-6.2l4.9-6.3.3 10.8c.3 10.6.3 10.7 2.7 10.7h2.5v-30h-2.4c-1.7 0-3.7 1.8-7.7 7-2.9 3.8-5.5 7-5.9 7-.3 0-2.9-3.2-5.9-7-3.3-4.3-6-7-7.2-7-1.8 0-1.9.9-1.9 15zM816 891c0 14.2.1 15 1.9 15 1.7 0 2-.8 2.3-5.3l.3-5.2 6.3-.5c5.2-.4 6.8-1 8.3-2.9 2.9-3.5 3.3-6.5 1.4-10.4-2.1-4.5-5-5.7-13.5-5.7h-7v15zm14.8-9.4c2.6 1.8 2.8 5 .5 7.6-1.1 1.3-3 1.8-6.5 1.8H820v-4.8c0-2.7.3-5.2.7-5.5 1.2-1.3 7.9-.7 10.1.9zM863.2 890.9c-6 15-6 15.1-3.6 15.1 1.9 0 2.8-.9 4-4l1.6-4h13l1.5 4c1.2 3.1 2.1 4 4 4 1.2 0 2.3-.1 2.3-.3 0-.2-2.6-6.8-5.8-14.7-5.2-13-6.1-14.5-8.4-14.8-2.4-.3-2.9.5-8.6 14.7zm12.7 1.8c.1.9-1.4 1.3-4.4 1.3-2.5 0-4.5-.2-4.5-.4s1-3 2.2-6.2l2.2-5.8 2.2 5c1.3 2.7 2.3 5.5 2.3 6.1zM911 891c0 14.2.1 15 2 15 1.8 0 2-.8 2.2-10.8l.3-10.7 8 10.7c6 8 8.6 10.7 10.3 10.8 2.2 0 2.2-.1 2.2-15v-15h-2.5c-2.4 0-2.4.1-2.7 10.6l-.3 10.5-7.8-10.5c-11.1-15-11.7-14.8-11.7 4.4zM961.8 879.2c9.1 14.8 9.2 15.2 9.2 21 0 5.5.1 5.8 2.5 5.8s2.5-.3 2.5-5.5c0-4.1.6-6.5 2.3-9.3 1.3-2 3.8-6.3 5.6-9.5l3.2-5.7h-2.5c-2.1 0-3.2 1.3-6.6 7-2.2 3.8-4.3 7-4.5 7-.2 0-2.1-3.1-4.2-7-3.3-6.1-4.2-7-6.6-7h-2.9l2 3.2zM1083 891.5v2.5h354v-5h-354v2.5z"/></svg>
      </motion.div>


         <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="absolute left-8 top-3/4 dark:text-gray-100 text-gray-900 text-xs font-azonix tracking-widest flex items-center space-x-2"
      >
        <span className="inline-block h-4 w-1 bg-green-500 mr-2"></span>
        <span>SCROLL AND DISCOVER</span>
      </motion.div>

      {/* SYNAPSE - animated */}
      <div className="flex-1 flex items-end">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="font-azonix text-gray-900 dark:text-gray-100 text-[7vw] leading-[1] pl-8 pb-6 select-none"
          style={{ letterSpacing: '0.02em' }}
        >
          SYNAPSE
        </motion.h1>
      </div>    

      {/* Optional: Scroll and discover message, left bottom */}
   
    </section>
  );
}
