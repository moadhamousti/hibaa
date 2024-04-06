import https from "https";

async function addToMailingList(email) {
    const SENDGRID_SECRET = "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";
    const SENDGRID_MAILING_ID = "a8795f87-96eb-4258-9494-1e3bf5996acb";
    const data = JSON.stringify({
        contacts: [{ email }],
        list_ids: [SENDGRID_MAILING_ID],
    });

    const options = {
        hostname: "api.sendgrid.com",
        port: 443,
        path: "/v3/marketing/contacts",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
            Authorization: `Bearer ${SENDGRID_SECRET}`,
        },
    };

    return new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let responseBody = "";

            response.on("data", (chunk) => {
                responseBody += chunk;
            });

            response.on("end", () => {
                try {
                    const json = JSON.parse(responseBody);
                    resolve({ status: response.statusCode, data: json }); // Resolve with status and data
                } catch (error) {
                    reject({ status: response.statusCode, message: error.message }); // Reject with status and error message
                }
            });
        });

        request.on("error", (error) => {
            reject({ status: 500, message: error.message }); // Reject with status 500 and error message
        });

        request.write(data);
        request.end();
    });
}

export default addToMailingList;
