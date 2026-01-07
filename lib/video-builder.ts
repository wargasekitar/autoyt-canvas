import ffmpeg from "./ffmpeg";
import path from "path";

export async function buildVideo({
  videoInput,
  audioInput,
  watermarkInput,
  output,
}: {
  videoInput: string;
  audioInput?: string;
  watermarkInput?: string;
  output: string;
}) {
  return new Promise((resolve, reject) => {
    let cmd = ffmpeg(videoInput);

    if (audioInput) {
      cmd = cmd.input(audioInput);
    }

    if (watermarkInput) {
      cmd = cmd.input(watermarkInput)
        .complexFilter([
          {
            filter: "overlay",
            options: { x: 20, y: 20 },
          },
        ]);
    }

    cmd
      .outputOptions([
        "-map 0:v",
        audioInput ? "-map 1:a" : "",
        "-shortest",
      ])
      .output(output)
      .on("end", () => resolve(true))
      .on("error", reject)
      .run();
  });
}
