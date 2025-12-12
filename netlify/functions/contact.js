exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const { name, email, phone, subject, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Meno, email a správa sú povinné polia' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Neplatný formát emailu' }),
      };
    }

    // Get environment variables
    const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
    const SMTP2GO_FROM_EMAIL = process.env.SMTP2GO_FROM_EMAIL;
    const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;

    if (!SMTP2GO_API_KEY || !SMTP2GO_FROM_EMAIL || !BUSINESS_EMAIL) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // Build email content
    const emailSubject = subject ? `MT Autos - Kontaktný formulár: ${subject}` : 'MT Autos - Nová správa z kontaktného formulára';

    const htmlBody = `
      <h2>Nová správa z kontaktného formulára</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Meno:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefón:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${phone || 'Neuvedené'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Predmet:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${subject || 'Neuvedené'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Správa:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">
        Táto správa bola odoslaná z kontaktného formulára na mtautos.sk
      </p>
    `;

    const textBody = `
Nová správa z kontaktného formulára

Meno: ${name}
Email: ${email}
Telefón: ${phone || 'Neuvedené'}
Predmet: ${subject || 'Neuvedené'}

Správa:
${message}

---
Táto správa bola odoslaná z kontaktného formulára na mtautos.sk
    `;

    // Send email via SMTP2GO API
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: SMTP2GO_API_KEY,
        to: [BUSINESS_EMAIL],
        sender: SMTP2GO_FROM_EMAIL,
        subject: emailSubject,
        html_body: htmlBody,
        text_body: textBody,
        custom_headers: [
          {
            header: 'Reply-To',
            value: email,
          },
        ],
      }),
    });

    const result = await response.json();

    if (!response.ok || result.data?.error) {
      console.error('SMTP2GO error:', result);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Nepodarilo sa odoslať email. Skúste to prosím neskôr.' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Email bol úspešne odoslaný'
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Nastala chyba pri spracovaní požiadavky' }),
    };
  }
};
