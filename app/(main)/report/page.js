"use client"

import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"

const ReportPage = () => {
  const dataA = [{ no: 1, tahun: "2024", nik: "123131233", nama: "Dwi" }]
  const columnsA = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
    ],
    []
  )

  const tableA = useMaterialReactTable({
    data: dataA,
    columns: columnsA,
    enableTopToolbar: false,
    enableBottomToolbar: false,
  })

  return (
    <main className="main">
      {/* Header */}
      <h3 className="title-black">Laporan</h3>
      {/* Divider */}
      <div className="divider" />

      {/* Table */}
      <div className="table">
        <p className="title-table">Tabel Rank Karyawan</p>
        <MaterialReactTable table={tableA} />
      </div>
    </main>
  )
}

export default ReportPage
