'use client'

import { useAddPegawaiMutation } from '@/store/api/pegawaiApi'
import { Alert, Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  nik: z.number(),
  nama: z.string(),
  alamat: z.string(),
  no_telepon: z.string(),
  divisi: z.string(),
})

export const ModalAddEmployee = ({ open, onClose }) => {
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  })

  const [addPegawai] = useAddPegawaiMutation()

  const onSubmit = (value) => {
    addPegawai(value)
      .unwrap()
      .then((payload) => {
        reset()
        onClose()
      })
      .catch((err) => alert(err.data.message))
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
        }}
      >
        <Box className='modal-title'>
          <p>Tambah Pegawai</p>
          <button className='button' onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className='divider' />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginY: '1rem',
            }}
          >
            <div className='row'>
              <label htmlFor='nik'>NIK</label>
              <Controller
                name='nik'
                control={control}
                render={({ field }) => (
                  <>
                    <NumericFormat
                      name='nik'
                      className='input'
                      inputProps={{ maxLength: 15 }}
                      value={field.value}
                      allowNegative={false}
                      onValueChange={(value) => {
                        const parsedValue = parseInt(value.value)
                        field.onChange(isNaN(parsedValue) ? null : parsedValue)
                      }}
                    />
                    {formState.errors.nik && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.nik.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='nama'>Nama</label>
              <Controller
                name='nama'
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type='text' id='nama' className='input' />
                    {formState.errors.nama && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.nama.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='address'>Alamat</label>
              <Controller
                name='alamat'
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type='text'
                      id='address'
                      className='input'
                    />
                    {formState.errors.alamat && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.alamat.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='phoneNumber'>No. Telepon</label>
              <Controller
                name='no_telepon'
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type='text'
                      id='phoneNumber'
                      className='input'
                    />
                    {formState.errors.no_telepon && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.no_telepon.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='division'>Divisi</label>
              <Controller
                name='divisi'
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type='text'
                      id='division'
                      className='input'
                    />
                    {formState.errors.divisi && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.divisi.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </Box>

          <div className='modal-button'>
            <button
              type='button'
              className='button red-button'
              onClick={onClose}
            >
              Batal
            </button>
            <button type='submit' className='button green-button'>
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}
