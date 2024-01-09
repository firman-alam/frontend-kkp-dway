'use client'

import { omniApi } from './api'

export const criteriaApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCriteria: builder.query({
      query: () => `criteria`,
    }),
    getCriteria: builder.query({
      query: ({ id }) => ({
        url: `criteria/${id}`,
      }),
    }),
  }),
})

export const { useGetAllCriteriaQuery, useLazyGetCriteriaQuery } = criteriaApi
