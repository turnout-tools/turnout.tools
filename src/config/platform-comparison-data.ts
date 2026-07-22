export interface Platform {
  id: string;
  name: string;
  faviconUrl?: string;
}

export interface ComparisonValue {
  value: string; // e.g. "Yes", "No", "5%", "T+3", "High"
  status?: 'positive' | 'negative' | 'neutral' | 'warning'; // for styling
  tooltip?: string; // Optional context tooltip details
}

export interface FeatureRow {
  name: string;
  description?: string;
  // Map of platformId -> comparison details
  values: Record<string, ComparisonValue>;
  // Sub-features under this category
  subFeatures?: FeatureRow[];
}

export const platforms: Platform[] = [
  { id: 'district', name: 'District', faviconUrl: 'https://district.in/favicon.ico' },
  { id: 'bookmyshow', name: 'BookMyShow', faviconUrl: 'https://assets-in.bmscdn.com/webin/common/favicon.ico' },
  { id: 'urbanaut', name: 'Urbanaut', faviconUrl: 'https://urbanaut.app/favicon.ico' },
  { id: 'puttingscene', name: 'Putting Scene', faviconUrl: 'https://puttingscene.com/favicon.ico' },
  { id: 'offlyn', name: 'Offlyn', faviconUrl: 'https://substackcdn.com/image/fetch/$s_!66pv!,w_32,h_32,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a075dc6-671d-419c-a0cf-e12ad92cb2e9_480x480.png' },
  { id: 'luma', name: 'Lu.ma', faviconUrl: 'https://lu.ma/favicon.ico' }
];

export const comparisonData: FeatureRow[] = [
  {
    name: 'Event Publishing',
    description: 'The process of publishing events on the platform',
    values: {},
    subFeatures: [
      {
        name: 'Self-service for event setup',
        description: 'Can you set up an event\'s name, images, description, timings, tickets, etc without talking to someone at the platform',
        values: {}
      },
      {
        name: 'Self-publishing',
        description: 'Can you create a public link for your event or does it go through a review process?',
          values: {
              district: {
                  value: 'Requires manual review',
                  status: 'negative'
              }
          },
        subFeatures: [{
          name: 'Approval turnaround times',
          description: 'How long it take for your event to be approved and published',
          values: {}
        },
        {
          name: 'Reasons for rejection',
          description: 'What get\'s reviewed and why your event was rejected',
          values: {}
        }]
        },
    ]
  },
  {
      name: 'Ticketing Flexibility',
      description: 'Features for setting up and managing ticketing on the platform, and what flexibility they offer',
    values: {},
    subFeatures: [
      {
        name: 'Ticket Tiers',
        description: 'Support for multiple ticket types, like early, regular, etc. within a single session',
        values: {}
      },
      {
        name: 'Custom questions for a ticket',
        description: 'Ability to ask custom attendee questions (text, dropdowns, checkboxes) during checkout.',
        values: {}
      },
      {
        name: 'Cross-session tickets',
        description: 'Sharing one more more ticket across multiple sessions',
        values: {}
      },
      {
        name: 'Validity options',
        description: '',
        values: {},
        subFeatures: [
          {
            name: 'Capacity limits',
            description: 'Total number of tickets available for sale',
            values: {}
          },
          {
            name: 'Availability and expiry times',
            description: 'Control over when tickets become available and expire',
            values: {}
            },
          {
            name: 'Per-session capacity',
            description: 'Total number of tickets available for sale (for cross-session tickets)',
            values: {}
            }
        ]
        },
        {
          name: 'Customize confirmation communication',
          description: 'Customize the content and format of ticket confirmation notifications',
          values: {}
        },
    ]
  },
  {
    name: 'Attendee Communication',
    values: {},
    subFeatures: [
      {
        name: 'Organizer Broadcasts',
        description: 'Sending announcements, emails, or updates directly to all registered attendees.',
        values: {}
      }
    ]
  },
];
