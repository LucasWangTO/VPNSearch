tabTitle = document.title;
tabTitle = tabTitle.replace(' - Google Search','').replaceAll(' ','+');

async function getIp() {
  const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
  const text = await response.text();
  let textArray = text.split(/\r?\n/)[2].replace("ip=",'');
  return(textArray);
}

async function checkIP(ip) {
  const response = await fetch("https://signals.api.auth0.com/v2.0/ip/" + ip, {
    headers: {
      "accept" : "application/json",
      "x-auth-token" : "API KEY"
    }
  });
  const text = await response.json();
  if (text.fullip.score < 0) {
      window.location.replace("https://duckduckgo.com/?q=" + tabTitle);
  }
}

getIp().then(ip => checkIP(ip));