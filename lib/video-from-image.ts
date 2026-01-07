import { getFFmpeg } from "./ffmpeg";

export async function createVideoFromImage({
  imagePath,
  audioPath,
  outputPath,
}: {
  imagePath: string;
  audioPath: string;
  outputPath: string;
}) {
  const ffmpeg = await getFFmpeg();

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .inputOptions(["-loop 1"])
      .input(audioPath)
      .outputOptions([
        "-c:v libx264",
        "-tune stillimage",
        "-shortest",
        "-pix_fmt yuv420p",
      ])
      .save(outputPath)
      .on("end", resolve)
      .on("error", reject);
  });
}
