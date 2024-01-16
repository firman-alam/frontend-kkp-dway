'use client'

import { useUpdateCriteriaMutation } from '@/store/api/criteriaApi'
import { Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  code: z.string(),
  nama: z.string(),
  bobot: z.string(),
  tipe: z.string(),
})

export const ModalEditCriteria = ({ open, onClose, data }) => {
  const [updateData] = useUpdateCriteriaMutation()
  console.log(data.id_kriteria)

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id_kriteria: data?.id_kriteria,
      code: data?.code,
      nama: data?.nama,
      tipe: data?.tipe,
      bobot: data?.bobot,
    },
  })

  const onSubmit = (value) => {
    value.id_kriteria = data?.id_kriteria

    updateData(value)
      .unwrap()
      .then(() => {})
      .catch((err) => console.log(err))
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
          <p>Edit Kriteria</p>
          <button className='button' onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className='divider' />

        <form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginY: '1rem',
            }}
          >
            <div className='row'>
              <label htmlFor='code'>Kode</label>
              <Controller
                name='code'
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type='text' id='code' className='input' />
                    {formState.errors.code && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.code.message}
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
              <label htmlFor='bobot'>Bobot</label>
              <Controller
                name='bobot'
                control={control}
                render={({ field }) => (
                  <>
                    <NumericFormat
                      name='bobot'
                      className='input'
                      inputProps={{ maxLength: 15 }}
                      value={field.value}
                      allowNegative={false}
                      onValueChange={(value) => {
                        const parsedValue = parseInt(value.value)
                        field.onChange(value.value)
                      }}
                    />
                    {formState.errors.bobot && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.bobot.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className='row'>
              <label htmlFor='tipe'>Tipe</label>
              <Controller
                name='tipe'
                control={control}
                defaultValue='benefit'
                render={({ field }) => (
                  <>
                    <select {...field} id='tipe' className='input'>
                      <option value='benefit'>Benefit</option>
                      <option value='cost'>Cost</option>
                    </select>
                    {formState.errors.tipe && (
                      <span style={{ color: 'red' }}>
                        {formState.errors.tipe.message}
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
