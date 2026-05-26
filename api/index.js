import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    // 1. Construct URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`);

    // 2. Map headers
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }

    // 3. Read body if present (handling raw streams and Vercel's pre-parsed body)
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body !== undefined) {
        if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
          body = req.body;
        } else {
          body = JSON.stringify(req.body);
        }
      } else {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        body = Buffer.concat(chunks);
      }
    }

    // 4. Create Web Request
    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: body ? 'half' : undefined,
    });

    // 5. Call the server handler
    const webResponse = await server.fetch(webRequest);

    // 6. Write Web Response back to Node res
    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;

    // Set headers
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Handle Set-Cookie specifically to support multiple cookies
    if (typeof webResponse.headers.getSetCookie === 'function') {
      const setCookies = webResponse.headers.getSetCookie();
      if (setCookies && setCookies.length > 0) {
        res.setHeader('set-cookie', setCookies);
      }
    }

    // Send response body
    const responseBody = await webResponse.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (error) {
    console.error('Error in Vercel handler wrapper:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
