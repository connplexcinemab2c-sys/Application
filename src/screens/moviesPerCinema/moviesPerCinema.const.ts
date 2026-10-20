import svgIndex from '../../assets/svgIndex';

const showPriceItem = [
  {
    id: 1,
    startPrice: '0',
    endPrice: '100',
    checked: false,
  },
  {
    id: 2,
    startPrice: '101',
    endPrice: '250',
    checked: false,
  },
  {
    id: 3,
    startPrice: '251',
    endPrice: '500',
    checked: false,
  },
  {
    id: 4,
    startPrice: '501',
    endPrice: 'Max',
    checked: false,
  },
];

const showTimeItem = [
  {
    id: 1,
    dayTime: 'Morning',
    startTime: '00:00',
    endTime: '11:59',
    period: 'AM',
    image: svgIndex.Morning,
    checked: false,
  },
  {
    id: 2,
    dayTime: 'Afternoon',
    startTime: '12:00',
    endTime: '15:59',
    period: 'PM',
    image: svgIndex.Afternoon,
    checked: false,
  },
  {
    id: 3,
    dayTime: 'Evening',
    startTime: '16:00',
    endTime: '18:59',
    period: 'PM',
    image: svgIndex.Evening,
    checked: false,
  },
  {
    id: 4,
    dayTime: 'Night',
    startTime: '19:00',
    endTime: '23:59',
    period: 'PM',
    image: svgIndex.Night,
    checked: false,
  },
];

export {showPriceItem, showTimeItem};
