import https from "https";


async function addToMailingList(email) {
    const SECRET = "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";
    // const SECRET = process.env.SEND_SECRET
    const ID = "eede4bd4-0224-487d-aa1c-48bb9f8d97ce";
    // const ID = process.env.SEND_ID

    console.log("hihi",SECRET)
    console.log("hojo",ID)

    const data = JSON.stringify({
        contacts: [{ email }],
        list_ids: [ID],
    });

    const options = {
        hostname: "api.sendgrid.com",
        port: 443,
        path: "/v3/marketing/contacts",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
            Authorization: `Bearer ${SECRET}`,
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
