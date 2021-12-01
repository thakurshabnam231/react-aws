<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
  </head>
  <style>
    body {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }
  </style>
  <script>
    // GENERATING CODE VERIFIER
    function dec2hex(dec) {
      return ("0" + dec.toString(16)).substr(-2);
    }
    function generateCodeVerifier() {
      var array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec2hex).join("");
    }
    function getCodeVerifier() {
      document.getElementById("code_verifier").value = generateCodeVerifier();
    }

    // GENERATING CODE CHALLENGE FROM VERIFIER
    function sha256(plain) {
      // returns promise ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    }

    function base64urlencode(a) {
      var str = "";
      var bytes = new Uint8Array(a);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
      }
      return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    async function generateCodeChallengeFromVerifier(v) {
      var hashed = await sha256(v);
      var base64encoded = base64urlencode(hashed);
      return base64encoded;
    }
    async function getCodeChallenge() {
      let codeVerifier = document.getElementById("code_verifier").value;
      try {
        let code_challenge = await generateCodeChallengeFromVerifier(
          codeVerifier
        );
        document.getElementById("code_challenge").value = code_challenge;
      } catch (e) {
        document.getElementById("code_challenge").value = JSON.stringify(e);
      }
    }
  </script>
  <body>
    <h1>
      Passwordless Login with <a href="https://www.cotter.app/">Cotter</a>
    </h1>
    <h3>
      Example Code Verifier & Code Challenge for OAuth 2.0 PKCE Flow
    </h3>
    <div>Step 1. Generate Code Verifier</div>
    <input type="text" id="code_verifier" value="" style="width: 500px;" />
    <br />
    <button onClick="getCodeVerifier()">Generate Code Verifier</button>

    <br />
    <br />
    <div>Step 2. Generate Code Challenge from Code Verifier</div>
    <input type="text" id="code_challenge" value="" style="width: 500px;" />
    <br />
    <button onClick="getCodeChallenge()">
      Generate Code Challenge from Code Verifier
    </button>
  </body>
</html>
