if (typeof party !== 'undefined') {
  console.log(party);
  localStorage.setItem(location.href, party.name);
  console.log('party is over')
}