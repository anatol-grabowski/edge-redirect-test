const chunkUrl = "https://panasonic-av3-qaprov.oxagile.com/av3-provider/api/v1/chunks/10.0/10.00/0.00/VIDEO?split=aHR0cHM6Ly9hdjNzb3VyY2V0ZXN0c3RvcmFnZS5ibG9iLmNvcmUud2luZG93cy5uZXQvdGVtcC8xZ2JfdmlkZW8uYXYz"
const options = {
  "credentials": "omit",
  "referrer": "https://build-4jrod7c9g.now.sh/",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
}

fetch(chunkUrl, options);