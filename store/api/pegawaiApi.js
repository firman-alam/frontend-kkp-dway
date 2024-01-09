'use client'

import { omniApi } from './api'

export const pegawaiApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPegawai: builder.query({
      query: () => `employee`,
    }),
    getPegawaiById: builder.query({
      query: ({ id }) => ({
        url: `employee/${id}`,
      }),
    }),
  }),
})

export const { useGetAllPegawaiQuery, useLazyGetPegawaiByIdQuery } = pegawaiApi
