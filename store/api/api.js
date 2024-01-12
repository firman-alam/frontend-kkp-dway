import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const omniApi = createApi({
  reducerPath: "omnichannel",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: () => ({}),
  overrideExisting: true,
  tagTypes: [],
})
