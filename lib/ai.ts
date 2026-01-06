export function buildPrompt({
  idea,
  style,
  theme,
  duration,
  narrator,
}: {
  idea: string;
  style: string;
  theme: string;
  duration: string;
  narrator: string;
}) {
  return `
Create an AI-generated video.

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

Visual:
Ultra high quality, cinematic lighting, smooth camera movement,
professional composition, 4K quality, film grain, dramatic mood.

Avoid text on screen unless cinematic.
`;
}
