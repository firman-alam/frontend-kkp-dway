"use client"

import { ModalAddCriteria } from "@/components/modals/criteria/modal-add-criteria"
import { ModalEditCriteria } from "@/components/modals/criteria/modal-edit-criteria"
import ModalDelete from "@/components/modals/delete/modal-delete"
import { useGetAllCriteriaQuery } from "@/store/api/criteriaApi"
import { MaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"

const CriteriaPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)

  //  const { data: criteria } = useGetAllCriteriaQuery()

  const data = []
  const columns = useMemo(
    () => [
      { accessorKey: "no", header: "No." },
      { accessorKey: "kode", header: "Kode" },
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "bobot", header: "Bobot" },
      { accessorKey: "tipe", header: "Tipe" },
      {
        accessorKey: "aksi",
        header: "Aksi",
        Cell: (params) => {
          return (
            <div className="action-wrapper">
              <button
                className="button green-button"
                onClick={() => {
                  console.log(params.row.original)
                }}
              >
                Edit <FaPen />
              </button>
              <button
                className="button red-button"
                onClick={() => {
                  console.log(params.row.original)
                }}
              >
                Hapus <FaTrash />
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const handleModalEdit = () => {
    setOpenModalEdit((prev) => !prev)
  }

  const handleModalDelete = () => {
    setOpenModalDelete((prev) => !prev)
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
        <MaterialReactTable
          data={data}
          columns={columns}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          enableColumnFilters={false}
        />
      </div>

      {/* Modals */}
      <ModalAddCriteria open={openModalAdd} onClose={handleModalAdd} />
      <ModalEditCriteria open={openModalEdit} onClose={handleModalEdit} />
      <ModalDelete open={openModalDelete} onClose={handleModalDelete} />
    </main>
  )
}

export default CriteriaPage
