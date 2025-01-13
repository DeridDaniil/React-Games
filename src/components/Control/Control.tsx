import { PropsWithChildren } from "react";
import styles from './Control.module.scss';

const Control = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.control}>
      {children}
    </div>
  )
}

export default Control;