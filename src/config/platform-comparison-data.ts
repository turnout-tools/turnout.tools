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
  { id: 'swiggy_scenes', name: 'Swiggy Scenes', faviconUrl: 'https://listonscenes.swiggy.com/favicon.png' },
  { id: 'puttingscene', name: 'Putting Scene', faviconUrl: 'https://puttingscene.com/favicon.ico' },
  { id: 'offlyn', name: 'Offlyn', faviconUrl: 'https://substackcdn.com/image/fetch/$s_!66pv!,w_32,h_32,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a075dc6-671d-419c-a0cf-e12ad92cb2e9_480x480.png' },
  { id: 'luma', name: 'Lu.ma', faviconUrl: 'https://lu.ma/favicon.ico' },
  { id: 'google_forms', name: 'Google Forms', faviconUrl: 'https://ssl.gstatic.com/docs/spreadsheets/forms/forms_icon_2026_v2.ico' },
];

export const defaultSelectedPlatformIds: string[] = [
  'district',
  'bookmyshow',
  'urbanaut',
  'swiggy_scenes',
  'puttingscene',
  'offlyn',
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
        values: {
          district: { value: 'Yes', status: 'positive' },
          bookmyshow: { value: 'Yes', status: 'positive' },
          urbanaut: { value: 'Yes', status: 'positive' },
          swiggy_scenes: { value: 'Yes', status: 'positive' },
          puttingscene: { value: 'Yes', status: 'positive' },
          offlyn: { value: 'Yes', status: 'positive' },
          luma: { value: 'Yes', status: 'positive' },
          google_forms: { value: 'Yes', status: 'positive' }
        }
      },
      {
        name: 'Self-publishing',
        description: 'Can you create a public link for your event or does it go through a review process?',
        values: {
          district: { value: 'Requires manual review', status: 'negative' },
          bookmyshow: { value: 'Requires manual review', status: 'negative' },
          swiggy_scenes: { value: 'Requires manual review', status: 'negative' },
          urbanaut: {
            value: 'Instant public link',
            status: 'positive',
            tooltip: 'No review process; immediately available and discoverable.'
          },
          puttingscene: {
            value: 'Instant private link',
            status: 'positive',
            tooltip: 'Private link available immediately; review is only required for discovery on the platform.'
          },
          offlyn: {
            value: 'Instant private link',
            status: 'positive',
            tooltip: 'Private link available immediately; review is only required for discovery on the platform.'
          },
          luma: {
            value: 'Instant private link',
            status: 'positive',
            tooltip: 'Private link available immediately; review is only required for discovery on the platform.'
          },
          google_forms: {
            value: 'Instant public link',
            status: 'positive',
            tooltip: 'Available immediately, but has no discovery page on the platform.'
          }
        },
        subFeatures: [
          {
            name: 'Approval turnaround times',
            description: 'How long it takes for your event to be approved and published',
            values: {
              district: {
                value: 'Unpredictable',
                status: 'negative',
                tooltip: 'Very opaque and unreliable; takes anywhere from under an hour to several days.'
              },
              bookmyshow: {
                value: 'A few hours',
                status: 'positive',
                tooltip: 'Usually reviewed and approved within a few hours.'
              },
              urbanaut: { value: 'N/A (Instant)', status: 'positive', tooltip: 'No review process required.' },
              swiggy_scenes: { value: '-', status: 'neutral' },
              puttingscene: {
                value: 'Same day (4–5 PM)',
                status: 'positive',
                tooltip: 'Reviewed around 4–5 PM on the same day (or next day if submitted later).'
              },
              offlyn: { value: 'N/A (Instant)', status: 'positive', tooltip: 'Private link is available instantly.' },
              luma: { value: 'N/A (Instant)', status: 'positive', tooltip: 'Private link is available instantly.' },
              google_forms: { value: 'N/A (Instant)', status: 'positive', tooltip: 'Instant publishing without review.' }
            }
          },
          {
            name: 'Reasons for rejection',
            description: 'What gets reviewed and why your event was rejected',
            values: {
              district: {
                value: 'AI image flags & ticket names',
                status: 'warning',
                tooltip: 'AI automated image reviews cause false positives. Also flags non-standard ticket tier names (anything other than Regular/Early Bird). Feedback shown on dashboard.'
              },
              bookmyshow: {
                value: 'Image & description guidelines',
                status: 'warning',
                tooltip: 'Reviews images and descriptions. Feedback is provided on dashboard.'
              },
              urbanaut: { value: 'N/A', status: 'neutral', tooltip: 'No review process.' },
              swiggy_scenes: { value: '-', status: 'neutral' },
              puttingscene: {
                value: 'No feedback provided',
                status: 'negative',
                tooltip: 'Provides no feedback or reasons when an event is rejected.'
              },
              offlyn: { value: 'N/A', status: 'neutral', tooltip: 'No review process for private links.' },
              luma: { value: 'N/A', status: 'neutral', tooltip: 'No review process for private links.' },
              google_forms: { value: 'N/A', status: 'neutral', tooltip: 'No review process.' }
            }
          }
        ]
      },
      {
        name: 'Multi-show event management',
        description: 'Creating new instances of the same event on new dates (e.g. a weekly open mic)',
        values: {
          district: { value: 'Very easy', status: 'positive' },
          bookmyshow: { value: 'Very easy', status: 'positive' },
          urbanaut: { value: 'Very easy', status: 'positive' },
          swiggy_scenes: { value: '-', status: 'neutral' },
          puttingscene: {
            value: 'Allowed',
            status: 'warning',
            tooltip: 'Future sessions don\'t trigger a new editorial review, so it won\'t be posted on future dates. Better to resubmit as a new event.'
          },
          offlyn: {
            value: 'Allowed (Max 3)',
            status: 'warning',
            tooltip: 'Supports multiple sessions/dates, but is limited to a maximum of 3 dates.'
          },
          luma: { value: '-', status: 'neutral' },
          google_forms: { value: '-', status: 'neutral' }
        }
      }
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
        values: {
          district: { value: 'Yes', status: 'positive' },
          bookmyshow: { value: 'Yes', status: 'positive' },
          urbanaut: { value: 'Yes', status: 'positive' },
          swiggy_scenes: { value: 'Yes', status: 'positive' },
          puttingscene: { value: 'Yes', status: 'positive' },
          offlyn: { value: 'Yes', status: 'positive' },
          luma: {
            value: 'No',
            status: 'negative',
            tooltip: 'Does not support payment processing natively on free tier / India setup.'
          },
          google_forms: {
            value: 'No',
            status: 'negative',
            tooltip: 'Does not support native ticketing or payment processing.'
          }
        }
      },
      {
        name: 'Custom questions for a ticket',
        description: 'Ability to ask custom attendee questions (text, dropdowns, checkboxes) during checkout.',
        values: {
          district: { value: 'Yes', status: 'positive' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'No', status: 'negative' },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'Yes', status: 'positive' },
          luma: { value: 'Yes', status: 'positive' },
          google_forms: { value: 'Yes', status: 'positive' }
        }
      },
      {
        name: 'Capacity limits',
        description: 'Total number of tickets available for sale',
        values: {
          district: { value: 'Yes', status: 'positive' },
          bookmyshow: { value: 'Yes', status: 'positive' },
          urbanaut: { value: 'Yes', status: 'positive' },
          swiggy_scenes: { value: 'Yes', status: 'positive' },
          puttingscene: { value: 'Yes', status: 'positive' },
          offlyn: { value: 'Yes', status: 'positive' },
          luma: { value: 'Yes', status: 'positive' },
          google_forms: { value: 'Yes', status: 'positive' }
        }
      },
      {
        name: 'Availability and expiry times',
        description: 'Control over when tickets become available and expire',
        values: {
          district: { value: 'No', status: 'negative' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'No', status: 'negative' },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: { value: 'No', status: 'negative' }
        }
      },
      {
        name: 'Cross-session tickets',
        description: 'Sharing one or more tickets across multiple sessions',
        values: {
          district: { value: 'No', status: 'negative' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: {
            value: 'Yes',
            status: 'positive',
            tooltip: 'Allows sharing tickets across sessions with session and overall ticket capacity limits.'
          },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: {
            value: 'Yes',
            status: 'positive',
            tooltip: 'Allows sharing tickets across sessions with session and overall ticket capacity limits.'
          },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: { value: 'No', status: 'negative' }
        },
        subFeatures: [
          {
            name: 'Per-session capacity',
            description: 'Total number of tickets available for sale per session (for cross-session tickets)',
            values: {
              district: { value: 'No', status: 'negative' },
              bookmyshow: { value: 'No', status: 'negative' },
              urbanaut: {
                value: 'Yes',
                status: 'positive',
                tooltip: 'Enforces session-level ticket caps so total sales do not exceed session limit.'
              },
              swiggy_scenes: { value: 'No', status: 'negative' },
              puttingscene: {
                value: 'Yes',
                status: 'positive',
                tooltip: 'Enforces session-level ticket caps so total sales do not exceed session limit.'
              },
              offlyn: { value: 'No', status: 'negative' },
              luma: { value: 'No', status: 'negative' },
              google_forms: { value: 'No', status: 'negative' }
            }
          }
        ]
      },
      {
        name: 'Group ticket discounts',
        description: 'Flexible group discounts when purchasing a minimum number of tickets together',
        values: {
          district: { value: 'No', status: 'negative' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: {
            value: 'Yes',
            status: 'positive',
            tooltip: 'Provides flexible group discounts for x tickets at y % off'
          },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: { value: 'No', status: 'negative' }
        }
      },
      {
        name: 'Custom promo codes',
        description: 'Discounts via a code people can enter during checkout',
        values: {
          district: { value: 'No', status: 'negative' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'Yes', status: 'positive' },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: { value: 'No', status: 'negative' }
        }
      },
      {
        name: 'Guest invitations',
        description: 'Ability to invite non-paying guests who receive a ticket',
        values: {
          district: {
            value: 'Yes (Paid)',
            status: 'warning',
            tooltip: 'Invites non-paying guests, but usually charged per guest'
          },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'No', status: 'negative' },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: { value: 'No', status: 'negative' }
        }
      }
    ]
  },
  {
    name: 'Attendee Communication & Sales Notifications',
    description: 'Tools for messaging attendees and receiving notifications when tickets sell',
    values: {},
    subFeatures: [
      {
        name: 'Customize confirmation communication',
        description: 'Ability to customize the confirmation email/whatsapp/sms message template sent to attendees',
        values: {
          district: { value: 'No', status: 'negative' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'Yes', status: 'positive', tooltip: 'Allows custom confirmation messaging.' },
          swiggy_scenes: { value: 'No', status: 'negative' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'No', status: 'negative' },
          luma: { value: 'No', status: 'negative' },
          google_forms: {
            value: 'Yes',
            status: 'positive',
            tooltip: 'Allows customizing post-submission response/confirmation email text.'
          }
        }
      },
      {
        name: 'Organizer Broadcasts',
        description: 'Sending announcements, updates, or broadcasts directly to buyers via WhatsApp or email',
        values: {
          district: { value: 'Manual', status: 'warning' },
          bookmyshow: {
            value: 'No',
            status: 'negative',
            tooltip: 'Does not share customer contact details with organizers'
          },
          urbanaut: { value: 'Paid (WhatsApp)', status: 'warning' },
          swiggy_scenes: { value: 'Manual', status: 'warning' },
          puttingscene: { value: 'Manual', status: 'warning' },
          offlyn: { value: 'Free (WhatsApp)', status: 'positive' },
          luma: { value: 'Manual', status: 'warning' },
          google_forms: { value: 'Manual', status: 'warning' }
        }
      },
      {
        name: 'Configurable event reminders',
        description: 'Automated event reminders sent to attendees prior to the event',
        values: {
          district: { value: 'Manual', status: 'warning' },
          bookmyshow: {
            value: 'No',
            status: 'negative',
            tooltip: 'Does not share customer contact details with organizers'
          },
          urbanaut: { value: 'Manual', status: 'warning' },
          swiggy_scenes: { value: 'Manual', status: 'warning' },
          puttingscene: { value: 'Manual', status: 'warning' },
          offlyn: {
            value: 'Multiple',
            status: 'positive',
            tooltip: 'Allows configuring multiple reminders'
          },
          luma: { value: 'Manual', status: 'warning' },
          google_forms: { value: 'Manual', status: 'warning' }
        }
      },
      {
        name: 'Realtime sales notifications',
        description: 'Real-time notifications sent to organizers when a sale or booking occurs',
        values: {
          district: { value: 'Discord, Slack & Webhooks', status: 'positive' },
          bookmyshow: { value: 'No', status: 'negative' },
          urbanaut: { value: 'Email', status: 'warning' },
          swiggy_scenes: { value: 'Email & SMS', status: 'positive' },
          puttingscene: { value: 'No', status: 'negative' },
          offlyn: { value: 'Email', status: 'warning' },
          luma: { value: '-', status: 'neutral' },
          google_forms: { value: 'Email & Apps Script', status: 'positive' }
        }
      }
    ]
  }
];
