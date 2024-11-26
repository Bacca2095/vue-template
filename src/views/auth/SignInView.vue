<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import AppButton from '@/components/buttons/AppButton.vue'
import AppInput from '@/components/inputs/AppInput.vue'
import AppTypography from '@/components/typography/AppTypography.vue'

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
    password: z.string().min(6, 'Password is required.'),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col justify-center gap-3">
    <AppTypography as="h1" size="lg" align="center" weight="semibold">Welcome</AppTypography>
    <AppTypography as="p" size="xs" align="center"
      >Sign in into company to use the app</AppTypography
    >
    <AppInput name="email" type="email" placeholder="Email" />
    <AppInput name="password" type="password" placeholder="Password" />
    <AppTypography as="p" size="xs" align="left" weight="bold">
      <router-link to="">Forgot Password?</router-link>
    </AppTypography>
    <AppButton type="submit">Sign in</AppButton>
    <AppTypography as="p" size="xs" align="left">
      Don't have account? <router-link to="/auth/sign-up" class="font-bold">Sing up</router-link>
    </AppTypography>
  </form>
</template>
