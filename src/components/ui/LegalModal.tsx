import { useEffect } from 'react'

interface LegalModalProps {
  type: 'privacy' | 'terms' | null
  onClose: () => void
}

const content = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      {
        heading: 'Information We Collect',
        text: 'When you submit an inquiry through our contact form, we collect your name, email address, company or organization name, a description of what you are working on, and your timeline. We may also collect basic analytics data such as page visits through third-party tools.',
      },
      {
        heading: 'How We Use Your Information',
        text: 'The information you provide is used solely to respond to your inquiry and to communicate with you about our consulting services. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
      },
      {
        heading: 'Data Storage',
        text: 'Inquiry submissions are stored securely in our database. We retain this information only as long as necessary to fulfill the purpose for which it was collected or as required by applicable law.',
      },
      {
        heading: 'Cookies & Analytics',
        text: 'Our website may use cookies or similar tracking technologies to understand how visitors interact with our site. You may disable cookies through your browser settings at any time.',
      },
      {
        heading: 'Your Rights',
        text: 'You have the right to request access to, correction of, or deletion of any personal information we hold about you. To make such a request, please contact us at hello@serinoconsulting.com.',
      },
      {
        heading: 'Contact',
        text: 'If you have questions about this Privacy Policy, please reach out to us at hello@serinoconsulting.com.',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    body: [
      {
        heading: 'Use of This Website',
        text: 'By accessing serinoconsulting.com, you agree to use this site for lawful purposes only. You may not use this website in any way that violates applicable laws or regulations, or that harms or could harm Serino Consulting or its clients.',
      },
      {
        heading: 'Intellectual Property',
        text: 'All content on this website — including text, images, logos, and design — is the property of Serino Consulting and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
      },
      {
        heading: 'No Professional Guarantee',
        text: 'The information on this website is provided for general informational purposes only. Nothing on this site constitutes professional advice. Outcomes from our consulting engagements may vary and are not guaranteed.',
      },
      {
        heading: 'Third-Party Links',
        text: 'Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those sites.',
      },
      {
        heading: 'Limitation of Liability',
        text: 'To the fullest extent permitted by law, Serino Consulting shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.',
      },
      {
        heading: 'Changes to These Terms',
        text: 'We reserve the right to update these Terms of Use at any time. Continued use of the site after changes are posted constitutes your acceptance of the updated terms.',
      },
      {
        heading: 'Contact',
        text: 'For questions about these Terms, contact us at hello@serinoconsulting.com.',
      },
    ],
  },
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [type])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!type) return null

  const { title, body } = content[type]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: '#111', border: '1px solid rgba(194,168,120,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-8 py-6"
          style={{ backgroundColor: '#111', borderBottom: '1px solid rgba(194,168,120,0.15)' }}
        >
          <h2 className="font-display text-2xl text-roma-cream">{title}</h2>
          <button
            onClick={onClose}
            className="font-heading text-xs tracking-widest uppercase text-roma-cream/40 hover:text-gold transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 flex flex-col gap-7">
          {body.map(({ heading, text }) => (
            <div key={heading}>
              <p className="font-heading text-xs tracking-widest uppercase mb-2" style={{ color: '#C2A878' }}>
                {heading}
              </p>
              <p className="font-body text-sm text-roma-cream/60 leading-relaxed">{text}</p>
            </div>
          ))}
          <p className="font-body text-xs text-roma-cream/25 pt-4" style={{ borderTop: '1px solid rgba(194,168,120,0.1)' }}>
            Last updated: April 2026
          </p>
        </div>
      </div>
    </div>
  )
}
