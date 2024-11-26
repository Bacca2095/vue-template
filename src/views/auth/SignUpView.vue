<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import AppButton from '@/components/buttons/AppButton.vue'
import AppInput from '@/components/inputs/AppInput.vue'
import AppTypography from '@/components/typography/AppTypography.vue'

const schema = toTypedSchema(
  z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
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
      >Register into company to use the app</AppTypography
    >
    <AppInput name="name" type="text" placeholder="Name" />
    <AppInput name="email" type="email" placeholder="Email" />
    <AppInput name="password" type="password" placeholder="Password" />

    <AppButton type="submit">Sign up</AppButton>
    <AppTypography as="p" size="xs" align="left">
      You have account? <router-link to="/auth/sign-in" class="font-bold">Sign in</router-link>
    </AppTypography>
  </form>
</template>
