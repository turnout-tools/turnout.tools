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
      { label: 'Platform Audiences', slug: '/docs/platforms-audiences' },
      { label: 'Listing Pitfalls', slug: '/docs/platforms-pitfalls' },
      { label: 'Choosing a Platform', slug: '/docs/platforms-picking' },
    ],
  },
  {
    label: 'Community Safety',
    items: [
      { label: 'Code of Conduct', slug: '/docs/code-of-conduct' },
    ],
  },
  {
    label: 'Ticketing Behavior',
    items: [
      { label: 'Advance Purchase Timing', slug: '/docs/ticketing-advance-purchase' },
    ],
  },
  {
    label: 'Economics & Strategy',
    items: [
      { label: 'Revenue Share vs Rentals', slug: '/docs/venue-revenue-share' },
      { label: 'Early Bird Pricing', slug: '/docs/early-bird-pricing' },
      { label: 'Making Organizers Money', slug: '/docs/making-organizers-money' },
    ],
  },
];
