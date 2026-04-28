import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0D0D0D;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D0D0D;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / wordmark -->
          <tr>
            <td style="padding-bottom:40px;border-bottom:1px solid rgba(194,168,120,0.2);">
              <p style="margin:0;font-family:Georgia,serif;font-size:18px;letter-spacing:0.2em;color:#C2A878;text-transform:uppercase;">
                Serino Consulting
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 0 32px;">
              <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#C2A878;">
                Message Received
              </p>
              <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:32px;font-weight:400;color:#F4F0EA;line-height:1.3;">
                ${name ? `${name},<br/>we're glad you reached out.` : `We're glad you reached out.`}
              </h1>
              <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;color:rgba(244,240,234,0.65);line-height:1.7;">
                Your message is in our hands. We read every submission personally and will follow up within 48 hours.
              </p>
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:rgba(244,240,234,0.65);line-height:1.7;">
                In the meantime, feel free to explore what we do — or book a call if you're ready to move now.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:40px;">
              <a href="https://calendly.com/serinoconsulting/30min"
                 style="display:inline-block;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#F4F0EA;background-color:#7a3825;padding:14px 32px;text-decoration:none;">
                Book a Call
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(194,168,120,0.2);padding-top:32px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:rgba(244,240,234,0.3);line-height:1.6;">
                Serino Consulting &nbsp;&middot;&nbsp; Portland, OR<br/>
                <a href="https://www.serinoconsulting.com" style="color:rgba(194,168,120,0.6);text-decoration:none;">
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

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Serino Consulting <strategy@serinoconsulting.com>',
      to: email,
      reply_to: 'strategy@serinoconsulting.com',
      subject: `We received your message — Serino Consulting`,
      html,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return res.status(500).json({ error: err })
  }

  return res.status(200).json({ ok: true })
}
