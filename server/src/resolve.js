// Resolve derived fields so the client gets plain content.
export function resolveSite(site) {
  return {
    ...site,
    whyChooseUs: site.whyChooseUs.map(({ auto, ...item }) =>
      auto === "branches" ? { ...item, body: site.branches.map((b) => b.name).join(", ") } : item
    ),
  };
}
