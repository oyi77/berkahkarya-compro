import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, businessType, monthlyRevenue, problemDescription } = req.body;

    // In a real scenario, we would use Nodemailer, Resend, or SendGrid here.
    // Since we are in the workspace, we will log it and simulate a success.
    
    console.log('Lead Submission Received:', {
      name,
      email,
      phone,
      businessType,
      monthlyRevenue,
      problemDescription,
      targetEmail: 'grahainsanmandiri@gmail.com'
    });

    // Simulate success
    return res.status(200).json({ success: true, message: 'Audit request received.' });
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
