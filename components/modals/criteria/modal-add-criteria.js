"use client"

import { Box, Dialog, Paper } from "@mui/material"
import { MdClose } from "react-icons/md"

export const ModalAddCriteria = ({ open, onClose }) => {
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
          <p>Tambah Kriteria</p>
          <button className="button" onClick={onClose}>
            <MdClose />
          </button>
        </Box>

        <div className="divider" />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginY: "1rem",
          }}
        >
          <div className="row">
            <label htmlFor="nik">Kode</label>
            <input type="text" id="nik" className="input" />
          </div>
          <div className="row">
            <label htmlFor="name">Nama</label>
            <input type="text" id="name" className="input" />
          </div>
          <div className="row">
            <label htmlFor="name">Bobot</label>
            <input type="text" id="name" className="input" />
          </div>
          <div className="row">
            <label htmlFor="name">Tipe</label>
            <input type="text" id="name" className="input" />
          </div>
        </Box>

        <div className="modal-button">
          <button type="button" className="button red-button" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="button green-button">
            Tambah
          </button>
        </div>
      </Box>
    </Dialog>
  )
}
