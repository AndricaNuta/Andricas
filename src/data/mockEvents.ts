export type Event = { id: string; title: string; date: string; city: string; price?: string };

export const mockEvents: Event[] = [
  { id: '1', title: 'Gala', date: '2025-09-12T18:00:00Z', city: 'Bucharest', price: '$25' },
  { id: '2', title: 'Volunteer', date: '2025-09-20T09:00:00Z', city: 'Cluj', price: 'Free' },
  { id: '3', title: 'Expo', date: '2025-10-02T10:00:00Z', city: 'Iasi', price: '$10' },
  { id: '4', title: 'Event 4', date: '2025-10-02T10:00:00Z', city: 'Iasi', price: '$10' },
  { id: '5', title: 'Event 5', date: '2025-10-02T10:00:00Z', city: 'Iasi', price: '$10' },
  { id: '6', title: 'Event 6', date: '2025-10-02T10:00:00Z', city: 'Iasi', price: '$10' },
  { id: '7', title: 'Event 7', date: '2025-10-02T10:00:00Z', city: 'Iasi', price: '$10' },
];
