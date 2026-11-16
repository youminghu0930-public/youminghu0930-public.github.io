// Keep geometry lossless while transferring a smaller payload. Older browsers use JSON.
export async function fetchPreviewJson(url, options = {}) {
  if (typeof DecompressionStream === 'function') {
    try {
      const response = await fetch(`${url}.gz`, options);
      if (response.ok) {
        if (response.headers.get('content-encoding')?.includes('gzip')) return response.json();
        return await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
      }
    } catch (error) {
      if (error.name === 'AbortError') throw error;
    }
  }
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  return response.json();
}
