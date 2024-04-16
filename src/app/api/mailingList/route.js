import https from "https";


async function addToMailingList(email) {
    const SECRET = "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";
    const ID = "b307268a-a192-48d6-8e27-68cdef5d82ff";

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
