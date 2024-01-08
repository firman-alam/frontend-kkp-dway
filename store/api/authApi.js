import { omniApi } from './api'

export const authApi = omniApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `auth/sign-in`,
        method: 'POST',
        body: { ...data },
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `auth/sign-up`,
        method: 'POST',
        body: { ...data },
      }),
    }),
    signOut: builder.mutation({
      query: (data) => ({
        url: `auth/sign-out`,
        body: { ...data },
        method: 'POST',
      }),
    }),
  }),
})

export const { useSignInMutation, useSignOutMutation, useSignUpMutation } =
  authApi
