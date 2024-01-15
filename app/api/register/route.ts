("use strict");
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
type RegsiterForm = {
  name: string;
  class: string;
  subjects: {
    mathematics: string;
    english: string;
    sciences: string;
  };
};

export async function sendMail(reqData: RegsiterForm[], email: string) {
  const info = await transporter.sendMail({
    from: process.env.NEXT_EMAIL_SENDER,
    to: email,
    subject: "Subject Registration Successful! | Wellmax-ristus ✔",
    text: "Congratulations! Your subject registration for the upcoming academic term at Wellmax-Ristus School has been successfully processed.",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Subject Registration Success</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      font-size:16px;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        padding: 7px;
      "
    >
      <h1 style="color: #007bff; text-align: center">
        Subject Registration Successful!
      </h1>
      <p style="color: #333; text-align: center; line-height: 1.5">
        Congratulations! Your subject registration for the upcoming academic
        term at Wellmax-Ristus School has been successfully processed.
      </p>

      <div
        style="
          margin-top: 20px;
          margin-bottom: 10px;
          padding: 10px;
          background-color: #e9f7fc;
          border-radius: 5px;
          text-align: left;
        "
      >
      ${reqData
        .map(
          (data) =>
            `
         <p style="text-transform: capitalize;><strong>Student Name:</strong> ${
           data.name
         }</p>
         <p style="text-transform: capitalize;><strong style="text-transform: capitalize;>Class:</strong> ${
           data.class
         }</p>
        <p><strong>Registered Subjects:</strong></p>
        <ul>
        ${Object.values(data.subjects)
          .filter((item) => typeof item === "string")
          .map(
            (val) =>
              `
            <li style="text-transform: capitalize;">${
              typeof val !== "boolean" && val
            }</li>
          `
          )
          .join("")}
        </ul>
        `
        )
        .join("")}
       
      </div>
    </div>

    <footer
      style="
        text-align: center;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
      "
    >
      &copy; 2024 Wellmax-Ristus School
    </footer>
  </body>
</html>

    `,
  });

  console.log("Message sent: %s", info.messageId);
}

export async function POST(request: NextApiRequest) {
  const body = await new Response(request.body).json();
  const regData = body.regData;
  const email = body.email;
  try {
    sendMail(regData, email)
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
