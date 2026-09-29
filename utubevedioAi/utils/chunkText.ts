function chunkText(
  text: string,
  chunkSize: number = 500,
  overlap: number = 50
): string[] {
  if (!text.trim()) return [];

  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const chunks: string[] = [];
  const step = chunkSize - overlap;

  for (let i = 0; i < words.length; i += step) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    chunks.push(chunk);
    if (i + chunkSize >= words.length) break;
  }

  return chunks;
}

export default chunkText;