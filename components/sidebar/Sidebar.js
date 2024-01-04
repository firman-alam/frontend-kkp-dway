import Link from 'next/link'

import styles from './page.module.css'

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.logo}>Dway</div>
      <nav>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href='/employee'>
              <p className={styles.menuLink}>Employee</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href='/criteria'>
              <p className={styles.menuLink}>Criteria</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href='/matrix'>
              <p className={styles.menuLink}>Matrix</p>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href='/report'>
              <p className={styles.menuLink}>Report</p>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Sidebar
