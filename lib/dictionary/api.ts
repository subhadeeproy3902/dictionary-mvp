export async function fetchWordDefinition(word: string): Promise<Response> {
  return fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  );
}

export function getAudioUrl(word: string, phonetics: Array<{ audio?: string }>) {
  const audioUrl = phonetics.find((p) => p.audio && p.audio.trim() !== "")?.audio;
  return audioUrl || `https://api.dictionaryapi.dev/media/pronunciations/en/${word.toLowerCase()}-us.mp3`;
}