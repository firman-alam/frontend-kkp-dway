'use client'

import ModalDelete from '@/components/modals/delete/modal-delete'
import { ModalAddNilai } from '@/components/modals/matrix/modal-add-nilai'
import { ModalEditNilai } from '@/components/modals/matrix/modal-edit-nilai'
import { useGetAllCriteriaQuery } from '@/store/api/criteriaApi'
import {
  useGetAllNilaiQuery,
  useGetMatriksQuery,
  useLazyGetNilaiQuery,
} from '@/store/api/matrixApi'
import { MaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

const MatrixPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEdit, setIdEdit] = useState(0)

  const { data: criteria } = useGetAllCriteriaQuery()
  const { data } = useGetAllNilaiQuery()
  const [getData, { data: nilai }] = useLazyGetNilaiQuery()
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
      {
        accessorKey: 'no',
        header: 'No.',
        size: 50,
        Cell: (params) => {
          return params.row.index + 1
        },
      },
      { accessorKey: 'tahun', header: 'Tahun', size: 40 },
      { accessorKey: 'nik', header: 'NIK', size: 70 },
      { accessorKey: 'nama', header: 'Nama', size: 70 },
    ],
    []
  )

  const actionColumn = useMemo(
    () => [
      {
        accessorKey: 'aksi',
        header: 'Aksi',
        size: 100,
        Cell: (params) => (
          <div className='action-wrapper'>
            <button
              className='button green-button'
              onClick={() => {
                setIdEdit(params.row.original.id_penilaian)
                handleModalEdit()
                getData({ id: params.row.original.id_penilaian })
              }}
            >
              Edit <FaPen />
            </button>
            <button
              className='button red-button'
              onClick={() => {
                setIdEdit(params.row.original.id_penilaian)
                handleModalDelete()
              }}
            >
              Hapus <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const columnsCriteria = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 50,
        Cell: (params) => {
          const details = params.row.original.details
          const data = details.find((d) => d.id_kriteria === c.id_kriteria)
          return data?.nilai
        },
      })) || []
    )
  }, [criteria])

  const dataColumns = [...columnsA, ...columnsCriteria, ...actionColumn]
  const reorderedColumns = dataColumns.sort((a, b) => {
    // You can adjust the condition based on your needs
    if (a.header === 'Aksi') return 1
    if (b.header === 'Aksi') return -1
    return 0
  })

  const columnsC = useMemo(
    () => [{ accessorKey: 'alternatif', header: 'Kode Alternatif' }],
    []
  )

  const columnsMatriks = useMemo(() => {
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

  const columnsPreferensi = useMemo(() => {
    return (
      criteria?.map((c) => ({
        accessorKey: `${c.id_kriteria}`,
        header: `${c.code}`,
        size: 100,
        Cell: (params) => {
          const details = params.row.original.details

          const data = details.find((d) => d.id_kriteria === c.id_kriteria)

          return data?.preferensi
        },
      })) || []
    )
  }, [criteria])

  const allColumnsMatriks = useMemo(
    () => columnsC.concat(columnsMatriks),
    [columnsA, columnsMatriks]
  )

  const allColumnsPreferensi = useMemo(
    () => columnsC.concat(columnsPreferensi),
    [columnsA, columnsPreferensi]
  )

  return (
    <main className='main'>
      {/* Header */}
      <h3 className='title-black'>Nilai Alternatif</h3>
      {/* Divider */}
      <div className='divider' />

      <div className='add'>
        <button type='button' className='button' onClick={handleModalAdd}>
          Tambah
          <FaPlus />
        </button>
      </div>

      {/* Table */}
      <div className='table'>
        <p className='title-table'>Tabel Nilai Pegawai</p>
        {criteria !== undefined && (
          <MaterialReactTable
            data={data || []}
            columns={reorderedColumns}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            enableColumnFilters={false}
          />
        )}
      </div>

      <div className='table'>
        <p className='title-table'>Tabel Matriks Nilai Pegawai</p>
        <MaterialReactTable
          data={matriks || []}
          columns={allColumnsMatriks}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>

      <div className='table'>
        <p className='title-table'>Tabel Nilai Preferensi Pegawai</p>
        <MaterialReactTable
          data={matriks || []}
          columns={allColumnsPreferensi}
          enableBottomToolbar={false}
          enableTopToolbar={false}
        />
      </div>

      {/* Modals */}
      <ModalAddNilai
        open={openModalAdd}
        onClose={handleModalAdd}
        data={matriks}
      />
      {nilai !== undefined && nilai.id_penilaian === idEdit && (
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
        title='nilai'
      />
    </main>
  )
}

export default MatrixPage
