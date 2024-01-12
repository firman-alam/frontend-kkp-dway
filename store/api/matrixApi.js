'use client'

import { omniApi } from './api'

export const matrixApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNilai: builder.query({
      query: () => `matrix/nilai`,
      providesTags: ["Nilai", "Kriteria", "Pegawai"],
    }),
    getNilai: builder.query({
      query: ({ id }) => ({
        url: `matrix/nilai/${id}`,
      }),
      providesTags: ["Nilai", "Kriteria", "Pegawai"],
    }),
    getMatriks: builder.query({
      query: () => `matrix`,
      providesTags: ["Nilai", "Kriteria", "Pegawai"],
    }),
    addNilai: builder.mutation({
      query: (data) => ({
        url: `matrix/nilai`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Nilai"],
    }),
    updateNilai: builder.mutation({
      query: (data) => ({
        url: `matrix/nilai`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Nilai"],
    }),
    deleteNilai: builder.mutation({
      query: ({ id }) => ({
        url: `matrix/nilai/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Nilai"],
    }),
    getRanks: builder.query({
      query: ({ tahun = 2024, size = 25 }) =>
        `matrix/rank?tahun=${tahun}&size=${size}}`,
      providesTags: ["Nilai", "Kriteria", "Pegawai"],
    }),
  }),
})

export const {
  useGetAllNilaiQuery,
  useLazyGetNilaiQuery,
  useGetMatriksQuery,
  useAddNilaiMutation,
  useUpdateNilaiMutation,
  useDeleteNilaiMutation,
  useGetRanksQuery,
  useLazyGetRanksQuery,
} = matrixApi
