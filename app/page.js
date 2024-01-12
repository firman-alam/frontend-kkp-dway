"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import styles from "./page.module.css"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/sign-up")
    }
  }, [router])

  return (
    <main className={styles.main}>
      <h1>Sistem Penunjang Keputusan dengan Metode Perhitungan SAW</h1>
      <h2>Dwi Setiabudi</h2>

      <div>
        <Link href="/sign-up" style={{ textDecoration: "none" }}>
          <button className="button accent-button">Masuk</button>
        </Link>
      </div>
    </main>
  )
}
