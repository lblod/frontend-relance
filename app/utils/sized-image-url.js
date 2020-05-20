export default function sizedImageUrl(id, { width = null, height = null }) {
  const params = { width, height };

  // build query params string
  var esc = encodeURIComponent;
  var query = Object.keys(params)
      .filter( k => params[k] !== null )
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

  // build the resulting uri
  if( id )
    return `/images/${id}?${query}`;

  return undefined;
}
