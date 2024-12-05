import type { Meta, StoryFn } from '@storybook/vue3'

import AppTypography from '@/components/typography/AppTypography.vue'

export default {
  title: 'Components/AppTypography',
  component: AppTypography,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      },
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right', 'justify'],
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'div'],
      },
    },
    weight: {
      control: {
        type: 'select',
        options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'red', 'blue', 'green', 'gray', 'custom'],
      },
    },
    invert: { control: 'boolean' },
    customColor: { control: 'color' },
    customClass: { control: 'text' },
  },
  tags: ['autodocs'],
} as Meta<typeof AppTypography>

export const DifferentSizes: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography size="xs">Texto Extra Pequeño (xs)</AppTypography>
      <AppTypography size="sm">Texto Pequeño (sm)</AppTypography>
      <AppTypography size="md">Texto Mediano (md)</AppTypography>
      <AppTypography size="lg">Texto Grande (lg)</AppTypography>
      <AppTypography size="xl">Texto Extra Grande (xl)</AppTypography>
      <AppTypography size="2xl">Texto 2x Extra Grande (2xl)</AppTypography>
      <AppTypography size="3xl">Texto 3x Extra Grande (3xl)</AppTypography>
    </div>
  `,
})

// Historia para Diferentes Alineaciones
export const DifferentAlignments: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography align="left">Texto Alineado a la Izquierda</AppTypography>
      <AppTypography align="center">Texto Alineado al Centro</AppTypography>
      <AppTypography align="right">Texto Alineado a la Derecha</AppTypography>
      <AppTypography align="justify">Texto Justificado</AppTypography>
    </div>
  `,
})

// Historia para Diferentes Elementos HTML
export const DifferentElements: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography as="h1">Este es un H1</AppTypography>
      <AppTypography as="h2">Este es un H2</AppTypography>
      <AppTypography as="h3">Este es un H3</AppTypography>
      <AppTypography as="span">Este es un Span</AppTypography>
      <AppTypography as="div">Este es un Div</AppTypography>
    </div>
  `,
})

// Historia para Diferentes Pesos de Fuente
export const DifferentWeights: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography weight="normal">Peso Normal</AppTypography>
      <AppTypography weight="medium">Peso Medio</AppTypography>
      <AppTypography weight="semibold">Peso Semibold</AppTypography>
      <AppTypography weight="bold">Peso Bold</AppTypography>
      <AppTypography weight="extrabold">Peso Extra Bold</AppTypography>
    </div>
  `,
})

// Historia para Diferentes Colores
export const DifferentColors: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography color="default">Color por Defecto</AppTypography>
      <AppTypography color="red">Color Rojo</AppTypography>
      <AppTypography color="blue">Color Azul</AppTypography>
      <AppTypography color="green">Color Verde</AppTypography>
      <AppTypography color="gray">Color Gris</AppTypography>
      <AppTypography color="custom" customColor="#ff6347">Color Personalizado (Tomato)</AppTypography>
    </div>
  `,
})

// Historia para Colores Invertidos
export const InvertedColors: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div class="dark:bg-gray-800 p-4">
      <AppTypography invert color="default">Texto Invertido por Defecto</AppTypography>
      <AppTypography invert color="red">Texto Invertido Rojo</AppTypography>
      <AppTypography invert color="blue">Texto Invertido Azul</AppTypography>
      <AppTypography invert color="green">Texto Invertido Verde</AppTypography>
      <AppTypography invert color="gray">Texto Invertido Gris</AppTypography>
      <AppTypography invert color="custom" customColor="#ff6347">Texto Invertido Personalizado (Tomato)</AppTypography>
    </div>
  `,
})

// Historia para Clases Personalizadas
export const CustomClasses: StoryFn<typeof AppTypography> = () => ({
  components: { AppTypography },
  template: `
    <div>
      <AppTypography customClass="underline text-purple-500">Texto con Clase Personalizada</AppTypography>
    </div>
  `,
})
