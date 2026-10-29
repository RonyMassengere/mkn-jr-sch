import type { Metadata } from 'next'
import { ParentHub } from '@/components/parent-hub'

export const metadata: Metadata = {
  title: 'Parents\' Hub',
  description:
    'Access school documents, updates, calendar events, and parent resources from Mukono Junior School.',
}

export default function ParentsHubPage() {
  return <ParentHub />
}
