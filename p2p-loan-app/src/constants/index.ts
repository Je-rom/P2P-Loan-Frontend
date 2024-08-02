const selectedOption =
  typeof window !== 'undefined' ? localStorage.getItem('selectedOption') : null;

export const bottombarLinks = [
  {
    imgURL: '/home.svg',
    route:
      selectedOption === 'radio' || selectedOption === 'artiste'
        ? `/${selectedOption}`
        : '/default',
    label: 'Home',
  },
  {
    imgURL: '/wallet.svg',
    route: `/transactions/${selectedOption}`,
    label: 'Transactions',
  },
  {
    imgURL: '/multimedia.svg',
    route: `/multimedia/${selectedOption}`,
    label: 'Multimedia',
  },
  {
    imgURL: '/settingsB.svg',
    route: `/account-settings/${selectedOption}`,
    label: 'Settings',
  },
];

