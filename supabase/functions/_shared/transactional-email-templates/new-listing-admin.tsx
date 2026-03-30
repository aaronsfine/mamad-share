import * as React from 'npm:react@18.3.1'
/// <reference types="npm:@types/react@18.3.1" />
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Mamad Directory"

interface NewListingAdminProps {
  hostName?: string
  city?: string
  neighborhood?: string
  totalReal?: number
  totalDemo?: number
}

const NewListingAdminEmail = ({
  hostName = 'Unknown',
  city = 'Unknown',
  neighborhood = 'Unknown',
  totalReal = 0,
  totalDemo = 0,
}: NewListingAdminProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>🏠 New real listing on {SITE_NAME}: {city}, {neighborhood}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 New Real Listing!</Heading>
        <Text style={text}>
          A new <strong>real listing</strong> was just created on {SITE_NAME}.
        </Text>

        <Section style={infoBox}>
          <Text style={infoLabel}>Host</Text>
          <Text style={infoValue}>{hostName}</Text>
          <Text style={infoLabel}>Location</Text>
          <Text style={infoValue}>{city} · {neighborhood}</Text>
        </Section>

        <Hr style={hr} />

        <Heading style={h2}>📊 Current Status</Heading>
        <Section style={statsBox}>
          <Text style={statItem}>
            <strong style={{ color: '#2563eb' }}>{totalReal}</strong> real listing{totalReal !== 1 ? 's' : ''}
          </Text>
          <Text style={statItem}>
            <strong style={{ color: '#6b7280' }}>{totalDemo}</strong> demo listing{totalDemo !== 1 ? 's' : ''}
          </Text>
          <Text style={statItem}>
            <strong>{totalReal + totalDemo}</strong> total active
          </Text>
        </Section>

        <Text style={footer}>
          — {SITE_NAME} Notifications
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewListingAdminEmail,
  subject: (data: Record<string, any>) =>
    `🏠 New real listing: ${data.city || 'Unknown'}, ${data.neighborhood || 'Unknown'}`,
  displayName: 'New listing admin notification',
  previewData: {
    hostName: 'Sarah K.',
    city: 'Tel Aviv',
    neighborhood: 'Florentin',
    totalReal: 3,
    totalDemo: 18,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '520px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1e3a5f', margin: '0 0 16px' }
const h2 = { fontSize: '18px', fontWeight: '600' as const, color: '#1e3a5f', margin: '0 0 12px' }
const text = { fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: '0 0 16px' }
const infoBox = {
  backgroundColor: '#f0f5ff',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '0 0 16px',
}
const infoLabel = { fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 2px', fontWeight: '600' as const }
const infoValue = { fontSize: '16px', color: '#1e3a5f', margin: '0 0 12px', fontWeight: '500' as const }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const statsBox = { margin: '0 0 20px' }
const statItem = { fontSize: '15px', color: '#374151', margin: '0 0 6px' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '24px 0 0' }
