'use client'

import ModalDelete from "@/components/modals/delete/modal-delete"
import { ModalAddNilai } from "@/components/modals/matrix/modal-add-nilai"
import { ModalEditNilai } from "@/components/modals/matrix/modal-edit-nilai"
import { useGetAllCriteriaQuery } from "@/store/api/criteriaApi"
import {
  useGetAllNilaiQuery,
  useGetMatriksQuery,
  useLazyGetNilaiQuery,
} from "@/store/api/matrixApi"
import { MaterialReactTable } from "material-react-table"
import { useMemo, useState } from "react"
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"

// const criteria = [
//   { id_kriteria: 1, code: "C1" },
//   { id_kriteria: 2, code: "C2" },
//   { id_kriteria: 3, code: "C3" },
//   { id_kriteria: 4, code: "C4" },
//   { id_kriteria: 5, code: "C5" },
// ]

// const nilai = [
//   {
//     id_nilai: 1,
//     no: 1,
//     tahun: 2024,
//     nik: 3123131231231,
//     nama: "Dwi",
//     details: [
//       { id_kriteria: 1, kode: "C1", nilai: 10 },
//       { id_kriteria: 2, kode: "C2", nilai: 10 },
//       { id_kriteria: 3, kode: "C3", nilai: 10 },
//       { id_kriteria: 4, kode: "C4", nilai: 10 },
//       { id_kriteria: 5, kode: "C5", nilai: 10 },
//     ],
//   },
//   {
//     id_nilai: 2,
//     no: 2,
//     tahun: 2024,
//     nik: 3123132135464,
//     nama: "Seti",
//     details: [
//       { id_kriteria: 1, kode: "C1", nilai: 10 },
//       { id_kriteria: 2, kode: "C2", nilai: 10 },
//       { id_kriteria: 3, kode: "C3", nilai: 10 },
//       { id_kriteria: 4, kode: "C4", nilai: 10 },
//       { id_kriteria: 5, kode: "C5", nilai: 10 },
//     ],
//   },
//   {
//     id_nilai: 3,
//     no: 3,
//     tahun: 2024,
//     nik: 312313124765,
//     nama: "Budi",
//     details: [
//       { id_kriteria: 1, kode: "C1", nilai: 10 },
//       { id_kriteria: 2, kode: "C2", nilai: 10 },
//       { id_kriteria: 3, kode: "C3", nilai: 10 },
//       { id_kriteria: 4, kode: "C4", nilai: 10 },
//       { id_kriteria: 5, kode: "C5", nilai: 10 },
//     ],
//   },
// ]

const MatrixPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEdit, setIdEdit] = useState(0)

  const { data: criteria } = useGetAllCriteriaQuery()
  const { data } = useGetAllNilaiQuery()
  const { data: nilai } = useLazyGetNilaiQuery()
  const { data: matriks } = useGetMatriksQuery()

  const handleModalAdd = () => {
    setOpenModalAdd((prev) => !prev)
  }

  const handleModalEdit = () => {
    setOpenModalEdit((prev) => !prev)
  }

  const handleModalDelete = () => {
    setOpenModalDelete((prev) => !prev)
  }

  const columnsA = useMemo(
    () => [
      { accessorKey: "no", header: "No.", size: 50 },
      { accessorKey: "tahun", header: "Tahun", size: 50 },
      { accessorKey: "nik", header: "NIK", size: 70 },
      { accessorKey: "nama", header: "Nama", size: 70 },
    ],
    []
  )

  const columnsB = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 100,
        Cell: (params) => {
          const details = params.row.original.details

          const data = details.find((d) => d.id_kriteria === c.id_kriteria)

          return data?.nilai
        },
      })) || []
    )
  }, [criteria])

  const columnsAction = useMemo(
    () => [
      {
        accessorKey: "aksi",
        header: "Aksi",
        size: 100,
        Cell: (params) => {
          return (
            <div className="action-wrapper">
              <button
                className="button green-button"
                onClick={() => {
                  setIdEdit(params.row.original.id_nilai)
                  handleModalEdit()
                }}
              >
                Edit <FaPen />
              </button>
              <button
                className="button red-button"
                onClick={() => {
                  setIdEdit(params.row.original.id_nilai)
                  handleModalDelete()
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

  const allColumnsA = useMemo(
    () => columnsA.concat(columnsB).concat(columnsAction),
    [columnsA, columnsB, columnsAction]
  )

  const columnsC = useMemo(
    () => [{ accessorKey: "kode_alternatif", header: "Kode Alternatif" }],
    []
  )

  const columnsKriteria = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 100,
        Cell: (params) => {
          const details = params.row.original.details

          const data = details.find((d) => d.id_kriteria === c.id_kriteria)

          return data?.nilai
        },
      })) || []
    )
  }, [criteria])

  const allColumnsB = useMemo(
    () => columnsC.concat(columnsKriteria),
    [columnsA, columnsKriteria]
  )

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
        <p className="title-table">Tabel Nilai Pegawai</p>
        <MaterialReactTable
          data={data || []}
          columns={allColumnsA}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>

      <div className="table">
        <p className="title-table">Tabel Matriks Nilai Pegawai</p>
        <MaterialReactTable
          data={matriks || []}
          columns={allColumnsB}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>

      {/* Modals */}
      <ModalAddNilai open={openModalAdd} onClose={handleModalAdd} />
      {nilai !== undefined && nilai.id_nilai === idEdit && (
        <ModalEditNilai
          open={openModalEdit}
          onClose={handleModalEdit}
          data={nilai}
        />
      )}
      <ModalDelete
        open={openModalDelete}
        onClose={handleModalDelete}
        id={idEdit}
        title="nilai"
      />
    </main>
  )
}

export default MatrixPage
