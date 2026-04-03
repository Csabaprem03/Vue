export const getPlatforms = (platform: string): string => {
  const p = platform.toLocaleLowerCase();
  if (p.includes("pc") || p.includes("windows")) return "bi:windows";
  if (p.includes("playstation") || p.includes("ps")) return "bi:playstation";
  if (p.includes("xbox")) return "bi:xbox";
  if (p.includes("switch")) return "bi:nintendo-switch";
  return "solar:gamepad-bold";
};
export const getPlatformsColor = (platform: string): string => {
  const p = platform.toLocaleLowerCase();
  const base = "w-12 h-6 rounded rounded-full text-zinc-100 p-1 ";

  if (p.includes("pc") || p.includes("windows")) return base + "bg-neutral-500";
  if (p.includes("playstation") || p.includes("ps"))
    return base + "bg-blue-500";
  if (p.includes("xbox")) return base + "bg-green-500 ";
  if (p.includes("switch")) return base + "bg-red-500 ";
  return base + "bg-neutral-100";
};

export const parsePlatform = (platforms: any): Array<string> => {
  if (!platforms) return [];
  let platformArray: Array<string> = [];
  if (Array.isArray(platforms)) {
    platformArray = platforms;
  } else if (typeof platforms === "string") {
    try {
      const parsed = JSON.parse(platforms);
      platformArray = Array.isArray(parsed) ? parsed : [platforms];
    } catch (error) {
      platformArray = platforms.split(",");
    }
  }
  const categories = new Set<String>();
  platformArray.forEach((p) => {
    const platform = p.toLowerCase().trim();
    if (platform.includes("pc") || platform.includes("windows"))
      categories.add("pc");
    else if (platform.includes("playstation") || platform.includes("ps"))
      categories.add("ps");
    else if (platform.includes("xbox")) categories.add("xbox");
    else if (platform.includes("switch")) categories.add("switch");
    else if (platform.length > 0) categories.add("other");
  });
  return Array.from(categories);
};
