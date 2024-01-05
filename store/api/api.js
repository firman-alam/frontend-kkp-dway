import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const omniApi = createApi({
  reducerPath: "omnichannel",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
  }),
  endpoints: () => ({}),
  overrideExisting: true,
  tagTypes: [],
})
