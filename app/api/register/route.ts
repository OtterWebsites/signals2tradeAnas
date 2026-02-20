import { NextResponse } from "next/server";
import { google } from "googleapis";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
};

function getEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const country = (body.country || "").trim();

    if (!firstName || !lastName || !email || !phone || !country) {
      return NextResponse.json(
        { ok: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const sheetId = getEnv("GOOGLE_SHEETS_SHEET_ID");
    const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Sheet1";

    const clientEmail = getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Append row (A:F)
    const values = [
      [
        new Date().toISOString(), // timestamp
        firstName,
        lastName,
        email,
        phone,
        country,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:F`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("REGISTER API ERROR:", err?.message || err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
