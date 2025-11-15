// utils/uploadImage.ts
export async function uploadImage(
  dataUrl: string,
  type: string
): Promise<string> {
  const file = dataURLtoFile(dataUrl, `${type}.jpg`);
  const formData = new FormData();
  formData.append("image", file);
  formData.append("type", type);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.url || "";
  } catch (error) {
    console.error("Upload failed:", error);
    return "";
  }
}

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}
