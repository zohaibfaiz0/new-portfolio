// ==================== 1. UPDATE: src/app/contact/page.tsx ====================
import { client } from '@/lib/sanity/client';
import { PROFILE_QUERY } from '@/lib/sanity/queries';
import { Profile } from '@/types/sanity';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import ContactForm from '@/components/contact/contact-form';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact | Personal Developer Portfolio",
  description: "Get in touch for projects and collaborations",
};

async function getProfile() {
  const profile = await client.fetch<Profile>(PROFILE_QUERY);
  return profile;
}

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <Section className="py-32">
      <Container>
        <ContactForm profile={profile} />
      </Container>
    </Section>
  );
}
