"use client"

import Accordion from "@/components/accordion/accordion"
import { ModalAddCriteria } from "@/components/modals/criteria/modal-add-criteria"
import { ModalEditCriteria } from "@/components/modals/criteria/modal-edit-criteria"
import ModalDelete from "@/components/modals/delete/modal-delete"
import { ModalAddDivision } from "@/components/modals/divisi/modal-add-divisi"
import {
  useGetAllCriteriaQuery,
  useLazyGetCriteriaQuery,
} from "@/store/api/criteriaApi"
import { AuthContext } from "@/utils/authContext"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

const items = [
  { title: "Divisi 1", content: [] },
  { title: "Divisi 2", content: [] },
  { title: "Divisi 3", content: [] },
]

const DivisiPage = () => {
  const [openModalDiv, setOpenModalDiv] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEdit, setIdEdit] = useState(0)

  // const { getUser } = useContext(AuthContext)
  // const user = getUser()

  const { data: criterias } = useGetAllCriteriaQuery()
  const [getData, { data: criteria }] = useLazyGetCriteriaQuery()

  const handleModalDiv = () => {
    setOpenModalDiv((prev) => !prev)
  }

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
      <h3 className="title-black">Divisi</h3>

      <div className="divider" />

      <div className="add">
        <button type="button" className="button" onClick={handleModalDiv}>
          Tambah
          <FaPlus />
        </button>
      </div>

      <Accordion data={items} className="my-accordion" initialOpenIndex={1} />

      {/* Modals */}
      <ModalAddDivision open={openModalDiv} onClose={handleModalDiv} />
      <ModalAddCriteria open={openModalAdd} onClose={handleModalAdd} />
      {criteria !== undefined && criteria.id_kriteria === idEdit && (
        <ModalEditCriteria
          open={openModalEdit}
          onClose={handleModalEdit}
          data={criteria}
        />
      )}
      <ModalDelete
        open={openModalDelete}
        onClose={handleModalDelete}
        id={idEdit}
        title="kriteria"
      />
    </main>
  )
}

export default DivisiPage
