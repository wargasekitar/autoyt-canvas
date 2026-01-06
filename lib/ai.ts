export function buildPrompt({
  idea,
  style,
  theme,
  duration,
  narrator,
  watermark,
  bgm,
}: {
  idea: string;
  style: string;
  theme: string;
  duration: string;
  narrator: string;
  watermark: string;
  bgm: string;
}) {
  return `
Create an AI video.

Topic:
${idea}

Style:
${style}

Theme:
${theme}

Narration:
${narrator}

Duration:
${duration}

Watermark:
${watermark}

Background Music:
${bgm}

Visual:
Ultra high quality, cinematic lighting, smooth camera movement,
professional composition, no visible text except watermark.
`;
}
