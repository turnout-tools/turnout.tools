export interface SidebarItem {
  label: string;
  slug: string;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export const sidebarConfig: SidebarGroup[] = [
  {
    label: 'Event Platforms',
    items: [
      { label: 'Feature Comparison', slug: '/docs/platforms-comparison' },
    ],
  },
  {
    label: 'Community Safety',
    items: [
      { label: 'Code of Conduct', slug: '/docs/code-of-conduct' },
    ],
  }
];
