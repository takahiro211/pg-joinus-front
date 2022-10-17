import * as React from "react";
import { motion } from "framer-motion";
import { ScrollToTop } from "./utils/Util";

export default function withRoot<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function WithRoot(props: P) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 4, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <ScrollToTop />
        <Component {...props} />
      </motion.div>
    );
  }

  return WithRoot;
}
