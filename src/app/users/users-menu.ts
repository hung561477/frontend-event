import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'icon-speedometer',
    link: '/users/dashboard',
  },
  {
    title: 'Create my event',
    icon: 'icon-eye',
    link: '/users/create-event'
  },
  {
    title: 'Monitoring',
    icon: 'icon-eye',
    link: '/users/monitoring'
  },
  {
    title: 'Recent Events',
    icon: 'icon-magnifier',
    link: '/users/monitoring'
  },
  {
    title: 'Search Event',
    icon: 'icon-magnifier',
    link: '/users/search-event'
  },
  {
    title: 'Past Events',
    icon: 'icon-notebook',
    link: '/users/past-event'
  },
  {
    title: 'My Calendar',
    icon: 'icon-screen-tablet',
    link: '/users/calendar'
  },
  {
    title: 'Contact us',
    icon: 'icon-call-out',
    link: '/users/contact'
  },
];
