'use client'

import { omniApi } from './api'

export const criteriaApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCriteria: builder.query({
      query: () => `criteria`,
      providesTags: ["Kriteria"],
    }),
    getCriteria: builder.query({
      query: ({ id }) => ({ url: `criteria/${id}` }),
      providesTags: ["Kriteria"],
    }),
    addCriteria: builder.mutation({
      query: (data) => ({ url: `criteria`, method: "POST", body: { ...data } }),
      invalidatesTags: ["Kriteria"],
    }),
    updateCriteria: builder.mutation({
      query: (data) => ({
        url: `criteria`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Kriteria"],
    }),
    deleteCriteria: builder.mutation({
      query: ({ id }) => ({ url: `criteria/${id}`, method: "DELETE" }),
      invalidatesTags: ["Kriteria"],
    }),
  }),
})

export const {
  useGetAllCriteriaQuery,
  useLazyGetCriteriaQuery,
  useAddCriteriaMutation,
  useUpdateCriteriaMutation,
  useDeleteCriteriaMutation,
} = criteriaApi
