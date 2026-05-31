import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Halal Dinner Club <hello@halaldinner.club>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Email sending error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

export async function sendRSVPConfirmation(email: string, eventTitle: string, eventDate: string) {
  return sendEmail({
    to: email,
    subject: `You're going to: ${eventTitle}`,
    html: `
      <h1>RSVP Confirmed!</h1>
      <p>You're confirmed for <strong>${eventTitle}</strong> on ${eventDate}.</p>
      <p>We look forward to seeing you there!</p>
      <p>- The Halal Dinner Club Team</p>
    `,
  })
}

export async function sendWaitlistPromotion(email: string, eventTitle: string, eventDate: string) {
  return sendEmail({
    to: email,
    subject: `Good news! You're off the waitlist for ${eventTitle}`,
    html: `
      <h1>You're Off the Waitlist!</h1>
      <p>A spot has opened up for <strong>${eventTitle}</strong> on ${eventDate}.</p>
      <p>You're now confirmed to attend!</p>
      <p>- The Halal Dinner Club Team</p>
    `,
  })
}

export async function sendEventReminder(email: string, eventTitle: string, eventDate: string, hoursUntil: number) {
  return sendEmail({
    to: email,
    subject: `Reminder: ${eventTitle} is in ${hoursUntil} hours`,
    html: `
      <h1>Event Reminder</h1>
      <p>This is a friendly reminder that <strong>${eventTitle}</strong> is happening on ${eventDate}.</p>
      <p>That's just ${hoursUntil} hours away!</p>
      <p>We can't wait to see you there!</p>
      <p>- The Halal Dinner Club Team</p>
    `,
  })
}

export async function sendEventUpdate(email: string, eventTitle: string, updateMessage: string) {
  return sendEmail({
    to: email,
    subject: `Update: ${eventTitle}`,
    html: `
      <h1>Event Update</h1>
      <p>There has been an update to <strong>${eventTitle}</strong>:</p>
      <p>${updateMessage}</p>
      <p>- The Halal Dinner Club Team</p>
    `,
  })
}

export async function sendEventCancellation(email: string, eventTitle: string, reason?: string) {
  return sendEmail({
    to: email,
    subject: `Cancelled: ${eventTitle}`,
    html: `
      <h1>Event Cancelled</h1>
      <p>We regret to inform you that <strong>${eventTitle}</strong> has been cancelled.</p>
      ${reason ? `<p>Reason: ${reason}</p>` : ''}
      <p>We apologize for any inconvenience.</p>
      <p>- The Halal Dinner Club Team</p>
    `,
  })
}