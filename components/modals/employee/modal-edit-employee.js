"use client"

import { Box, Dialog, Paper } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"

export const ModalEditEmployee = ({ open, onClose, data }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nik: data.nik,
      nama: data.nama,
      alamat: data.alamat,
      no_telepon: data.no_telepon,
      divisi: data.divisi,
    },
  })

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
          <p>Tambah Pegawai</p>
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
              <label htmlFor="nik">NIK</label>
              <Controller
                name="nik"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" id="nik" className="input" />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="name">Nama</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" id="name" className="input" />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="address">Alamat</label>
              <Controller
                name="alamat"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="address"
                    className="input"
                  />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="phoneNumber">No. Telepon</label>
              <Controller
                name="no_telepon"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="phoneNumber"
                    className="input"
                  />
                )}
              />
            </div>

            <div className="row">
              <label htmlFor="division">Divisi</label>
              <Controller
                name="divisi"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="division"
                    className="input"
                  />
                )}
              />
            </div>
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
