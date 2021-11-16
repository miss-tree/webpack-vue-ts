declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '@/router/index.ts'

// declare module '@/*' {
//   import { defineComponent } from 'vue'
//   const component: ReturnType<typeof defineComponent>
//   export default component
// }