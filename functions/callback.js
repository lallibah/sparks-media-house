export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url);
    const code = searchParams.get("code");
    const client_id = "Ov23li1O4v6JoGHXnHei";
    const client_secret = "64b724592f9e5bbd14bae48501f380016aa2d501";

    if (!code) {
        return new Response("No code provided", { status: 400 });
    }

    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "user-agent": "decap-cms-cloudflare-pages",
            "accept": "application/json",
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code,
        }),
    });

    const result = await response.json();

    if (result.error) {
        return new Response(JSON.stringify(result), { status: 400 });
    }

    // This is the format Decap CMS expects: a small script that posts the message back to the opener window
    const content = `
    <!doctype html><html><body><script>
      (function() {
        function recieveMessage(e) {
          console.log("Recieved message:", e.data);
          if (e.data !== "authorizing:github") return;
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({
        token: result.access_token,
        provider: "github",
    })}',
            e.origin
          );
        }
        window.addEventListener("message", recieveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script></body></html>
  `;

    return new Response(content, {
        headers: { "content-type": "text/html" },
    });
}
