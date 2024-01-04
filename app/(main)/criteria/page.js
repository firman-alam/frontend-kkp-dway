"use client"

import { ModalAddCriteria } from "@/components/modals/criteria/modal-add-criteria"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPlus } from "react-icons/fa"

const CriteriaPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const data = []
  const columns = useMemo(
    () => [
      { accessorKey: "no", header: "No." },
      { accessorKey: "kode", header: "Kode" },
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "bobot", header: "Bobot" },
      { accessorKey: "tipe", header: "Tipe" },
      { accessorKey: "aksi", header: "Aksi" },
    ],
    []
  )

  const table = useMaterialReactTable({
    data,
    columns,
  })

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
        <MaterialReactTable table={table} />
      </div>

      {/* Modals */}
      <ModalAddCriteria open={openModalAdd} onClose={handleModalAdd} />
    </main>
  )
}

export default CriteriaPage
