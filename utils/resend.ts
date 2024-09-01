import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendKey);

export default resend;