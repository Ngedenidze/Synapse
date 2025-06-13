'use client';

import React, { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Send,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// ANIMATION VARIANTS
// -----------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const hoverScale = { scale: 1.05, transition: { type: 'spring', stiffness: 300 } };
const tapScale = { scale: 0.95 };

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
export default function Contact() {
  // Parallax blobs
  const { scrollYProgress } = useScroll();
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Simple local form state (no validation libs to keep it lightweight)
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with real endpoint / email service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-teal-50 px-6 py-32 dark:from-black dark:via-gray-900 dark:to-black md:py-24"
    >
      {/* Decorative blobs */}
      <motion.div
        aria-hidden
        style={{ y: blob1Y }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl dark:bg-purple-700/30"
      />
      <motion.div
        aria-hidden
        style={{ y: blob2Y }}
        className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-900/30"
      />

      {/* Heading */}
      <motion.h2
        className="mb-16 text-center font-azonix text-4xl font-bold leading-tight text-gray-800 dark:text-gray-100 md:text-5xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Let’s <span className="text-indigo-600 dark:text-indigo-400">Connect</span>
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-16 md:grid-cols-2"
      >
        {/* Contact Details */}
        <motion.div
          variants={staggerItem}
          className="flex font-azonix flex-col gap-12 rounded-3xl bg-white/70 p-10 shadow-2xl backdrop-blur-md dark:bg-white/10 dark:shadow-none"
        >
          {[{
            icon: MapPin,
            label: 'Address',
            content: ['123 Anywhere St.', 'Caldwell, NJ, USA'],
          },
          {
            icon: Phone,
            label: 'Phone',
            content: ['+995 577 54 33 53'],
            link: 'tel:+995577543353',
          },
          {
            icon: Mail,
            label: 'Email',
            content: ['hello@reallygreatsite.com'],
            link: 'mailto:hello@reallygreatsite.com',
          }].map(({ icon: Icon, label, content, link }, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <Icon className="mt-1 h-8 w-8 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">{label}</h3>
                {content.map((line, i) =>
                  link ? (
                    <a
                      key={i}
                      href={link}
                      className="block text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-gray-600 dark:text-gray-300">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}

          {/* Socials */}
          <div className="mt-6 flex gap-6">
            {[Twitter, Instagram, Facebook].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={hoverScale}
                whileTap={tapScale}
              >
                <Icon className="h-7 w-7 text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={staggerItem}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-3xl font-azonix bg-white/90 p-10 shadow-2xl backdrop-blur-md dark:bg-white/10 dark:shadow-none"
        >
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
          ].map(({ label, name, type }) => (
            <div key={name} className="relative">
              <input
                type={type}
                id={name}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                className="peer h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 font-azonix text-gray-800 outline-none transition focus:border-indigo-600 dark:border-gray-600 dark:text-gray-100 focus:dark:border-indigo-400"
              />
              <label
                htmlFor={name}
                className="pointer-events-none absolute left-4 top-1/2 translate-y-[-50%] text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-indigo-600 dark:text-gray-400 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-indigo-600"
              >
                {label}
              </label>
            </div>
          ))}

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 pt-4 font-azonix text-gray-800 outline-none transition focus:border-indigo-600 dark:border-gray-600 dark:text-gray-100 focus:dark:border-indigo-400"
            ></textarea>
            <label
              htmlFor="message"
              className="pointer-events-none absolute left-4 top-4 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-indigo-600 dark:text-gray-400 peer-valid:-top-3 peer-valid:text-sm peer-valid:text-indigo-600"
            >
              Message
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={hoverScale}
            whileTap={tapScale}
            className="group relative flex items-center justify-center gap-2 self-start rounded-full bg-indigo-600 px-10 py-4 font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {submitted ? 'Sent!' : 'Send Message'}
            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Submission feedback */}
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-green-600 dark:text-green-400"
              >
                Thank you! Your message has been sent.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </section>
  );
}
