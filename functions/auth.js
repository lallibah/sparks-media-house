export async function onRequest(context) {
    const client_id = "Ov23li1O4v6JoGHXnHei";
    const url = new URL("https://github.com/login/oauth/authorize");
    url.searchParams.set("client_id", client_id);
    url.searchParams.set("scope", "repo,user");

    return Response.redirect(url.toString(), 302);
}
