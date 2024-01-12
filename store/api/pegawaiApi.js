'use client'

import { omniApi } from './api'

export const pegawaiApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPegawai: builder.query({
      query: () => `employee`,
      providesTags: ["Pegawai"],
    }),
    getPegawaiById: builder.query({
      query: ({ id }) => ({ url: `employee/${id}` }),
      providesTags: ["Pegawai"],
    }),
    addPegawai: builder.mutation({
      query: (data) => ({
        url: "employee",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Pegawai"],
    }),
    updatePegawai: builder.mutation({
      query: (data) => ({
        url: "employee",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Pegawai"],
    }),
    deletePegawai: builder.mutation({
      query: ({ id }) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pegawai"],
    }),
  }),
})

export const {
  useGetAllPegawaiQuery,
  useLazyGetPegawaiByIdQuery,
  useAddPegawaiMutation,
  useUpdatePegawaiMutation,
  useDeletePegawaiMutation,
} = pegawaiApi
