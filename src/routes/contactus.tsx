import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contactus')({
  component: () => <div>Hello /contactus!</div>
})