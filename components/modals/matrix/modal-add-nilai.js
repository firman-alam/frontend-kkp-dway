'use client'

import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import { useGetAllPegawaiQuery } from '@/store/api/pegawaiApi'
import { Box, Dialog, Paper } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

const criteria = [
  { id_kriteria: 1, code: "C1", nama: "Loyalitas" },
  { id_kriteria: 2, code: "C2", nama: "Kedisiplinan" },
  { id_kriteria: 3, code: "C3", nama: "Kepemimpan" },
  { id_kriteria: 4, code: "C4", nama: "Kinerja" },
  { id_kriteria: 5, code: "C5", nama: "Umur" },
]

export const ModalAddNilai = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm()

  const { data: employee } = useGetAllPegawaiQuery()
  // const { data: criteria } = useGetAllCriteriaQuery()

  const onSubmit = (value) => {
    console.log(value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"md"}>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box className="modal-title">
          <p>Tambah Nilai</p>
          <button className="button" onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className="divider" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginY: "1rem",
            }}
          >
            <div className="row">
              <label htmlFor="name">Nama</label>
              <Controller
                name="role"
                control={control}
                defaultValue="admin" // Set default value if needed
                render={({ field }) => (
                  <select {...field} id="role" className="input">
                    {employee?.map((e) => (
                      <option value="admin" key={e.id_pegawai}>
                        {e.nama + " - " + e.nik}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="row">
              <label htmlFor="tahun">Tahun</label>
              <input type="text" id="tahun" className="input" />
            </div>
            {criteria?.map((c) => (
              <div className="row" key={c.id_kriteria}>
                <label htmlFor="name">{c.nama}</label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="admin" // Set default value if needed
                  render={({ field }) => (
                    <select {...field} id="role" className="input">
                      {optionsValue?.map((e) => (
                        <option value={e.value} key={e.value}>
                          {e.value}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            ))}
          </Box>

          <div className="modal-button">
            <button
              type="button"
              className="button red-button"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="button green-button">
              Tambah
            </button>
          </div>
        </form>
      </Box>
    </Dialog>
  )
}

const optionsValue = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
  { value: 30, label: 30 },
  { value: 35, label: 35 },
  { value: 40, label: 40 },
  { value: 45, label: 45 },
  { value: 50, label: 50 },
  { value: 55, label: 55 },
  { value: 60, label: 60 },
  { value: 65, label: 65 },
  { value: 70, label: 70 },
  { value: 75, label: 75 },
  { value: 80, label: 80 },
  { value: 85, label: 85 },
  { value: 90, label: 90 },
  { value: 95, label: 95 },
  { value: 100, label: 100 },
]
