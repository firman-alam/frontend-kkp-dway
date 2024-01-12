"use client"

import { ModalAddCriteria } from "@/components/modals/criteria/modal-add-criteria"
import { MaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa"

const CriteriaPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const data = [
    { no: 1, kode: 'C1', nama: 'Loyalitas', bobot: 2, tipe: 'Benefit'},
    { no: 2, kode: 'C2', nama: 'Kedisiplinan', bobot: 2, tipe: 'Benefit'},
    { no: 3, kode: 'C3', nama: 'Kepemimpinan', bobot: 2, tipe: 'Benefit'},
    { no: 4, kode: 'C4', nama: 'Tanggung Jawab', bobot: 2, tipe: 'Benefit'},
    { no: 5, kode: 'C5', nama: 'Sikap & Karakter', bobot: 2, tipe: 'Benefit'},
  ]

  const columns = useMemo(

    () => [
      { accessorKey: "no", header: "No.", size: 50 },
      { accessorKey: "kode", header: "Kode", size: 50 },
      { accessorKey: "nama", header: "Nama", size: 50 },
      { accessorKey: "bobot", header: "Bobot", size: 50 },
      { accessorKey: "tipe", header: "Tipe", size: 50 },
      { accessorKey: "aksi", header: "Aksi", size: 50 },
    ],
    []
  )

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  return (
    <main className="main">
      <h3 className="title-black">Kriteria</h3>

      <div className="divider" />

      <div className="add">
        <button type="button" className="button" onClick={handleModalAdd}>
          Tambah
          <FaPlus />
        </button>
      </div>

      {/* Table */}
      <div className="table">
        <MaterialReactTable data={data} columns={columns} />
      </div>

      {/* Modals */}
      <ModalAddCriteria open={openModalAdd} onClose={handleModalAdd} />
    </main>
  )
}

export default CriteriaPage
