'use client'

import { useUpdatePegawaiMutation } from '@/store/api/pegawaiApi'
import { Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  nik: z.number(),
  nama: z.string().min(1, 'Minimal 3 huruf').max(50, 'Maksimal 50 huruf'),
  alamat: z.string(),
  no_telepon: z.string(),
  divisi: z.string(),
})

export const ModalEditEmployee = ({ open, onClose, data }) => {
  const [updateData] = useUpdatePegawaiMutation()

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id_pegawai: data?.id_pegawai,
      nik: data?.nik,
      nama: data?.nama,
      alamat: data?.alamat,
      no_telepon: data?.no_telepon,
      divisi: data?.divisi,
    },
  })

  const onSubmit = (value) => {
    value.id_pegawai = data?.id_pegawai
    updateData(value)
      .unwrap()
      .then(() => {})
      .catch((err) => console.log(err))
    console.log(value)
    onClose()
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
          <p>Edit Pegawai</p>
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
            <button
              type='submit'
              className='button green-button'
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}
