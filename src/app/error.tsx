'use client';

import { useEffect } from 'react';
import styles from "./error.module.css"
import Image from 'next/image';

//type ErrorType = {
//    error:,
//    reset:
//}

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className="wrapper">
      <div className="container">
        <main className={styles.main}>
          <div className={styles.error}>
            <h2 className={styles.errorTitle}>Что-то пошло не так!</h2>
            <Image src="/img/cat-scream.gif" alt="logo" width={275} height={220}/>
            <button className={styles.errorButton} onClick={reset}>Попробовать снова</button>
          </div>
        </main>
      </div>
    </div>
  );
}