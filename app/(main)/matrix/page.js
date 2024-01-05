"use client"

import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"

const MatrixPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const dataA = [{ no: 1, tahun: "2024", nik: "123131233", nama: "Dwi" }]
  const columnsA = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
      {
        accessorKey: "aksi",
        header: "Aksi",
        size: 100,
        Cell: (params) => {
          return (
            <div className="action-wrapper">
              <button className="button green-button">
                Edit <FaPen />
              </button>
              <button className="button red-button">
                Hapus <FaTrash />
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  const dataB = []
  const columnsB = useMemo(
    () => [{ accessorKey: "kode_alternatif", header: "Kode Alternatif" }],
    []
  )

  const tableA = useMaterialReactTable({
    data: dataA,
    columns: columnsA,
    enableTopToolbar: false,
    enableBottomToolbar: false,
  })

  const tableB = useMaterialReactTable({
    data: dataB,
    columns: columnsB,
    enableTopToolbar: false,
    enableBottomToolbar: false,
  })

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Matriks</h3>
      {/* Divider */}
      <div className="divider" />

      <div className="add">
        <button type="button" className="button" onClick={handleModalAdd}>
          Tambah
          <FaPlus />
        </button>
      </div>

      {/* Table */}
      <div className="table">
        <p className="title-table">Tabel Nilai Karyawan</p>
        <MaterialReactTable table={tableA} />
      </div>

      <div className="table">
        <p className="title-table">Tabel Matriks Nilai Karyawan</p>
        <MaterialReactTable table={tableB} />
      </div>
    </main>
  )
}

export default MatrixPage
