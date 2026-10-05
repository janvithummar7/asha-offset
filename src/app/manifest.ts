import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asha Offset",
    short_name: "Asha Offset",
    description:
      "Printing and packaging company in Gondal, Gujarat, established 1998.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe5",
    theme_color: "#b71c28",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
