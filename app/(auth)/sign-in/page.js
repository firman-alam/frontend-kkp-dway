'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { useSignInMutation } from '@/store/api/authApi'
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

const SignInPage = () => {
  const [signIn] = useSignInMutation()

  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    signIn(data)
      .unwrap()
      .then((payload) => {
        Cookies.set('token', payload.accessToken)
        console.log(payload.accessToken)
      })
      .catch((error) => console.error(error))
  }

  return (
    <main className={styles.main}>
      <h3 className='title'>Selamat datang!</h3>
      <form className={styles.form}>
        <label htmlFor='username' className={styles.label}>
          Nama
        </label>
        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <input
              {...field}
              type='text'
              id='username'
              className={styles.input}
            />
          )}
        />
        <div className={styles.row}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                {...field}
                type='password'
                id='password'
                className={styles.input}
              />
            )}
          />
        </div>

        <div className={styles.divider} />

        <button
          type='submit'
          className={styles.button}
          onClick={handleSubmit(onSubmit)}
        >
          Masuk
        </button>

        <Link href='/sign-up' style={{ textDecoration: 'none' }}>
          <p className={styles.question}>
            Belum punya akun? <span>Daftar</span>.
          </p>
        </Link>
      </form>
    </main>
  )
}

export default SignInPage
