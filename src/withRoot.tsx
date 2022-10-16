import * as React from 'react';
import { motion } from "framer-motion";

export default function withRoot<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
) {
  function WithRoot(props: P) {
    return (
      <motion.div
              initial={{ opacity: 0, y: 0 }} // 初期状態
              animate={{ opacity: 1, y: 0 }} // マウント時
              exit={{ opacity: 10, y: 0 }} // アンマウント時
              transition={{
              duration: 0.8,
              }}
      >
        <Component {...props} />
      </motion.div>
    );
  }

  return WithRoot;
}
