import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const PageTransition = ({ children }) => {
  const router = useRouter();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
