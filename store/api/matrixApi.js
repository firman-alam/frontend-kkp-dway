'use client'

import { omniApi } from './api'

export const matrixApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNilai: builder.query({
      query: () => `matrix/nilai`,
    }),
    getNilai: builder.query({
      query: ({ id }) => ({
        url: `matrix/nilai/${id}`,
      }),
    }),
  }),
})

export const { useGetAllNilaiQuery, useLazyGetNilaiQuery } = matrixApi
