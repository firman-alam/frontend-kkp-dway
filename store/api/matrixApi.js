'use client'

import { omniApi } from './api'

export const matrixApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNilai: builder.query({
      query: () => `matrix/nilai`,
      providesTags: ["Nilai"],
    }),
    getNilai: builder.query({
      query: ({ id }) => ({
        url: `matrix/nilai/${id}`,
      }),
      providesTags: ["Nilai"],
    }),
    getMatriks: builder.query({
      query: () => `matrix`,
      providesTags: ["Nilai"],
    }),
    addNilai: builder.mutation({
      query: ({ data }) => ({
        url: `matrix/nilai`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Nilai"],
    }),
    updateNilai: builder.mutation({
      query: ({ data }) => ({
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
  }),
})

export const {
  useGetAllNilaiQuery,
  useLazyGetNilaiQuery,
  useGetMatriksQuery,
  useAddNilaiMutation,
  useUpdateNilaiMutation,
  useDeleteNilaiMutation,
} = matrixApi
