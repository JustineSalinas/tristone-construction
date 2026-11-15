export type ShowcaseProject = {
  slug: string;
  name: string;
  location?: string;
  flag?: string;
  cover: string;
  images: string[];
  description?: string;
  verse?: string;
  video?: string;
  /** Small category shown in the breadcrumb and facts grid, e.g. "Turnover", "Design". */
  status?: string;
  /** e.g. "2-Storey Residential". Falls back to "Residential" in the modal. */
  type?: string;
  /** A short chip shown on the cover photo, e.g. "Under Construction". */
  badge?: string;
  stats?: { label: string; value: string }[];
  interior?: string[];
  outdoor?: string[];
  upgrades?: string[];
  freebies?: string[];
};
