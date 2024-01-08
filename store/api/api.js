import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const getToken = () => Cookies.get('token')

export const omniApi = createApi({
  reducerPath: 'omnichannel',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/',
    prepareHeaders: (headers) => {
      // Include the token in the request headers
      const token = getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  overrideExisting: true,
  tagTypes: [],
})
