const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const q = event.queryStringParameters.q;
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter 'q'" })
    };
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cx     = process.env.GOOGLE_CSE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};