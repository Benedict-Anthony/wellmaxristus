import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMail(email: string, subject: string, text: string) {
  const info = await transporter.sendMail({
    from: email,
    to: process.env.NEXT_EMAIL_SENDER,
    subject: subject,
    text: text,
  });
}

export async function POST(request: NextApiRequest) {
  const body = await new Response(request.body).json();
  const email = body.email;
  const text = body.text;
  const subject = body.subject;
  try {
    sendMail(email, subject, text)
      .then()
      .catch((error) => console.log(error));
    return new NextResponse(JSON.stringify({ message: "email successful" }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: "Server Error..." }), {
      status: 500,
    });
  }
}
