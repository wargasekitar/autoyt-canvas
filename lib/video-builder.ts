import { getFFmpeg } from "./ffmpeg";

export async function buildVideo({
  videoInput,
  audioInput,
  watermarkInput,
  output,
  watermarkScale,
  bgmVolume,
}: {
  videoInput: string;
  audioInput?: string;
  watermarkInput?: string;
  output: string;
  watermarkScale: number;
  bgmVolume: number;
}) {
  const ffmpeg = await getFFmpeg();

  return new Promise((resolve, reject) => {
    let cmd = ffmpeg(videoInput);

    const filters: any[] = [];

    // 🎵 Audio volume
    if (audioInput) {
      cmd = cmd.input(audioInput);
      filters.push({
        filter: "volume",
        options: bgmVolume / 100,
      });
    }

    // 🖼️ Watermark scale
    if (watermarkInput) {
      cmd = cmd.input(watermarkInput);
      filters.push({
        filter: "scale",
        options: `${watermarkScale / 100}*iw:${watermarkScale / 100}*ih`,
      });
      filters.push({
        filter: "overlay",
        options: { x: 20, y: 20 },
      });
    }

    cmd
      .complexFilter(filters)
      .outputOptions(["-shortest"])
      .output(output)
      .on("end", () => resolve(true))
      .on("error", reject)
      .run();
  });
}
