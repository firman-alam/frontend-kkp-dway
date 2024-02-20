"use client"

import { MaterialReactTable } from "material-react-table"
import React, { useState, useMemo } from "react"
import { FaPen, FaTrash } from "react-icons/fa"

const Accordion = ({ data, className, initialOpenIndex = 0 }) => {
  const [expandedIndex, setExpandedIndex] = useState(initialOpenIndex)

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "No.",
        Cell: (params) => {
          return params.row.index + 1
        },
      },
      { accessorKey: "code", header: "Kode", size: 40 },
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "bobot", header: "Bobot", size: 50 },
      { accessorKey: "tipe", header: "Tipe", size: 50 },
      {
        accessorKey: "aksi",
        header: "Aksi",
        Cell: (params) => {
          return (
            <div className="action-wrapper">
              <button
                className="button green-button"
                onClick={() => {
                  handleModalEdit()
                  setIdEdit(params.row.original.id_kriteria)
                  getData({ id: params.row.original.id_kriteria })
                }}
              >
                Edit <FaPen />
              </button>
              <button
                className="button red-button"
                onClick={() => {
                  handleModalDelete()
                  setIdEdit(params.row.original.id_kriteria)
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

  return (
    <div className={`${className} accordion`} role="tablist">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`accordion-header ${
              expandedIndex === index ? "active" : ""
            }`}
            role="tab"
            onClick={() => handleToggle(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Spacebar") {
                handleToggle(index)
              }
            }}
            tabIndex={0}
            aria-expanded={expandedIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            {item.title}
          </div>
          <div
            className={`accordion-body ${
              expandedIndex === index ? "show" : ""
            }`}
            role="tabpanel"
            id={`accordion-content-${index}`}
            aria-labelledby={`accordion-header-${index}`}
          >
            {/* Table */}
            <div className="table">
              <MaterialReactTable
                data={item.content}
                columns={columns}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                enableColumnFilters={false}
              />
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Accordion
