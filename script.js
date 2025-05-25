document.getElementById('search-form').addEventListener('submit', async e => {
  e.preventDefault();
  const q = document.getElementById('query').value.trim();
  if (!q) return;
  
  const resList = document.getElementById('results');
  resList.innerHTML = '<li>Loading…</li>';

  try {
    const resp = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(q)}`);
    const { items } = await resp.json();
    
    if (!items || items.length === 0) {
      resList.innerHTML = '<li>No results found.</li>';
      return;
    }

    resList.innerHTML = items.map(item =>
      `<li>
         <a href="${item.link}" target="_blank">${item.title}</a><br/>
         <small>${item.snippet}</small>
       </li>`
    ).join('');
  } catch (err) {
    resList.innerHTML = `<li>Error: ${err.message}</li>`;
  }
});
