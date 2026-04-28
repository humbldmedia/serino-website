import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, company, situation, timeline } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  const confirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#F4F0EA;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F0EA;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / wordmark -->
          <tr>
            <td style="padding-bottom:36px;border-bottom:1px solid rgba(124,97,34,0.2);">
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;letter-spacing:0.22em;color:#7C6122;text-transform:uppercase;">
                Serino Consulting
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 0 32px;">
              <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#7C6122;">
                Message Received
              </p>
              <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:30px;font-weight:400;color:#1A1A1A;line-height:1.35;">
                ${name ? `${name},<br/>we're glad you reached out.` : `We're glad you reached out.`}
              </h1>
              <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;color:rgba(26,26,26,0.65);line-height:1.75;">
                Your message is in our hands. We read every submission personally and will follow up within 48 hours.
              </p>
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:rgba(26,26,26,0.65);line-height:1.75;">
                In the meantime, feel free to explore what we do — or book a call if you're ready to move now.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:40px;">
              <a href="https://calendly.com/serinoconsulting/30min"
                 style="display:inline-block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#F4F0EA;background-color:#7a3825;padding:14px 32px;text-decoration:none;">
                Book a Call
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(124,97,34,0.2);padding-top:28px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:rgba(26,26,26,0.35);line-height:1.7;">
                Serino Consulting &nbsp;&middot;&nbsp; Portland, OR<br/>
                <a href="https://www.serinoconsulting.com" style="color:#7C6122;text-decoration:none;">
                  serinoconsulting.com
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const notificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:32px 24px;background-color:#F4F0EA;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="padding-bottom:24px;border-bottom:1px solid rgba(124,97,34,0.2);">
        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#7C6122;">New Contact Submission</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding-bottom:16px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7C6122;">Name</p>
            <p style="margin:0;font-size:16px;color:#1A1A1A;">${name || '—'}</p>
          </td></tr>
          <tr><td style="padding-bottom:16px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7C6122;">Email</p>
            <p style="margin:0;font-size:16px;color:#1A1A1A;"><a href="mailto:${email}" style="color:#7a3825;text-decoration:none;">${email}</a></p>
          </td></tr>
          <tr><td style="padding-bottom:16px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7C6122;">Company</p>
            <p style="margin:0;font-size:16px;color:#1A1A1A;">${company || '—'}</p>
          </td></tr>
          <tr><td style="padding-bottom:16px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7C6122;">Timeline</p>
            <p style="margin:0;font-size:16px;color:#1A1A1A;">${timeline || '—'}</p>
          </td></tr>
          <tr><td>
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7C6122;">What they're working on</p>
            <p style="margin:0;font-size:16px;color:#1A1A1A;line-height:1.6;">${situation || '—'}</p>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="border-top:1px solid rgba(124,97,34,0.2);padding-top:24px;">
        <p style="margin:0;font-size:12px;color:rgba(26,26,26,0.4);">Serino Consulting &middot; serinoconsulting.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const headers = {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  }

  // Send both emails in parallel
  const [confirmRes, notifyRes] = await Promise.all([
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: 'Serino Consulting <strategy@serinoconsulting.com>',
        to: email,
        reply_to: 'strategy@serinoconsulting.com',
        subject: 'We received your message — Serino Consulting',
        html: confirmationHtml,
      }),
    }),
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: 'Serino Consulting <strategy@serinoconsulting.com>',
        to: 'serinoconsulting@gmail.com',
        reply_to: email,
        subject: `New inquiry from ${name || email}`,
        html: notificationHtml,
      }),
    }),
  ])

  if (!confirmRes.ok || !notifyRes.ok) {
    const err = await (!confirmRes.ok ? confirmRes : notifyRes).text()
    return res.status(500).json({ error: err })
  }

  return res.status(200).json({ ok: true })
}
