import type { NextConfig } from "next";

/** Earlier test URLs now served by the handbook-based assessments. */
const renamedTests: Record<string, string> = {
  "personality-type": "mbti",
  "career-explorer": "riasec",
  "workstyle-compass": "disc",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(renamedTests).flatMap(([from, to]) => [
      { source: `/tests/${from}`, destination: `/tests/${to}`, permanent: true },
      { source: `/tests/${from}/take`, destination: `/tests/${to}/take`, permanent: true },
    ]);
  },
};

export default nextConfig;
