
const providerInput = document.querySelector('.provider-input');
const sendBtn = document.querySelector('.send-btn');

function convertAv3ProviderResponseToEvidences(av3ProviderResponse) {
  const url = av3ProviderResponse[0].channels[0].playlistUrl;
  const token = av3ProviderResponse[0].channels[0].token.value;
  console.log(url, token);
  const req = ajax()
  req.url = url
  req.headers = {
    'AV3-Provider-Authorization': token,
  }
  req.get()
  .then(playlist => {
     const chunksUrls = playlist.match(/http.*/)
     console.log('chunkUrl', chunksUrls[0])
     const req2 = ajax()
     req2.url = chunksUrls[0]
     req2.headers = {
        'AV3-Provider-Authorization': token,
     }
     return req2.get()
  })
  .then(chunk => {
    console.log('got chunk, length:', chunk.length)
  })
}

window.convertAv3ProviderResponseToEvidences = convertAv3ProviderResponseToEvidences;

providerInput.addEventListener('input', function() {
  const text = providerInput.value;
  console.log('Got text: ', text);
  convertAv3ProviderResponseToEvidences(JSON.parse(text));
});



sendBtn.addEventListener('click', () => {
  const req = ajax()
  req.url = 'http://10.151.40.117:8081/redirect?split=123'  + Math.random()
  req.headers = {
    'av3-provider-authorization': '123',
  }
  req.send()
  .then(resp => {
    console.log('got resp', resp)
  })
})