import path from "node:path";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.AP_NETLIFY_BUILD === "true"
    ? ""
    : process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
  outputFileTracingRoot: path.resolve(process.cwd()),
};
export default nextConfig;
