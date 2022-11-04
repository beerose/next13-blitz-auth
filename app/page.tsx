import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js 13 + Blitz Auth!</a>
      </h1>
      <div className={styles.grid}>
        <Link href="/signup" className={styles.card}> 
          <p>Signup</p>
        </Link>
        <Link href="/login" className={styles.card}>
          <p>Login</p>
        </Link>   
      </div>
      <div className={styles.grid}>
        <a href="https://beta.nextjs.org/docs" className={styles.card}>
          <h2>Next.js Documentation &rarr;</h2>
          <p>Learn more about Next.js 13</p>
        </a>
        <a href="https://blitzjs.com/docs" className={styles.card}>
          <h2>Blitz.js Documentation &rarr;</h2>
          <p>Learn more about Blitz.js</p>
        </a>
      </div>
    </main>
  )
}
