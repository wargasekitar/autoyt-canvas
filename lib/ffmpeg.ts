export async function getFFmpeg() {
  const ffmpeg = (await import("fluent-ffmpeg")).default;
  const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");

  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  return ffmpeg;
}
