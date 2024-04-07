import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    const apiKey = "92928b756e623357b3bd80e8dc90deaea841703fde9b55743db01070adf6d270a7123a6138485e7a3b7b59e4c979d541";

    // Extract email from request body
    const { email } = req.body;

    if (!email) {
      // Handle missing email in request body (optional)
      return new NextResponse("Missing email in request body", { status: 400 });
    }

    // const apiUrl = `https://verifier.meetchopra.com/verify?email=<span class="math-inline">\{encodeURIComponent\(email\)\}&key\=</span>{encodeURIComponent(apiKey)}`;

    const apiUrl = `https://verifier.meetchopra.com/verify?email=${email}&key=${encodeURIComponent(apiKey)}`;


    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      return {
        status: response.status,
        data: data
      };
    } else {
      console.error("Failed to verify email:", response.statusText);
      return new NextResponse("Failed to verify email", { status: 500 });
    }
  } catch (error) {
    console.error("Error proxying request:", error);
    return new NextResponse("Failed to proxy request", { status: 500 });
  }
};
