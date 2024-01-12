import Link from "next/link"
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Sistem Penunjang Keputusan dengan Metode Perhitungan SAW</h1>
      <h2>Dwi Setiabudi</h2>

      <div>
        <Link href="/employee" style={{ textDecoration: "none" }}>
          <button className="button accent-button">Masuk</button>
        </Link>
      </div>
    </main>
  )
}
