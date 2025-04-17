import { motion } from 'framer-motion';
// Quote Section (No changes)
const Quote = () => (
    <motion.section className="py-16 md:py-24 bg-indigo-600 dark:bg-indigo-900 text-white dark:text-gray-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-6 text-center">
        <motion.blockquote className="text-2xl md:text-3xl italic font-medium max-w-4xl mx-auto mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }}>
          "In the world of business, the most successful companies are those that embrace change and adapt to new technologies."
        </motion.blockquote>
        <motion.p className="text-lg text-indigo-200 dark:text-indigo-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.4 }}>
          - Bill Gates
        </motion.p>
      </div>
    </motion.section>
  );

  export default Quote;