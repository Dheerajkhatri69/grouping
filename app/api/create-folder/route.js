// app/api/create-folder/route.js
import { NextResponse } from "next/server";

// Only needed on local university network
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
const TENANT_ID = process.env.AZURE_TENANT_ID;
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const FOLDER_PATH = process.env.ONEDRIVE_FOLDER_PATH || "PST_Project";

let cachedToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: process.env.ONEDRIVE_REFRESH_TOKEN,
        grant_type: "refresh_token",
        scope: "Files.ReadWrite offline_access User.Read",
      }),
    }
  );

  const data = await res.json();
  if (!data.access_token) throw new Error("Token error: " + (data.error_description || data.error));

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function POST(request) {
  try {
    const { folderName } = await request.json();

    if (!folderName?.trim()) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    const token = await getAccessToken();

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${FOLDER_PATH}:/children`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName.trim(),
          folder: {},
          "@microsoft.graph.conflictBehavior": "rename",
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed" }, { status: res.status });
    }

    return NextResponse.json({ success: true, folderName: data.name });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}