import { FC } from 'react';
import styles from './Files.module.scss';

interface IFilesProps {
  files: number[];
}

const Files: FC<IFilesProps> = ({ files }) => {
  return (
    <div className={styles.files}>
      {files.map(file => <span key={file}>{String.fromCharCode(file + 96)}</span>)}
    </div>
  )
}

export default Files;