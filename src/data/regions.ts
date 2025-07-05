import { Region } from '../types';

export const regionLabels: Record<Region, string> = {
  [Region.Europe]: 'ヨーロッパ',
  [Region.WestAsia]: '西アジア',
  [Region.Africa]: 'アフリカ',
  [Region.CentralSouthAsia]: '中央・南アジア',
  [Region.EastAsia]: '東アジア',
  [Region.SoutheastAsia]: '東南アジア',
  [Region.Oceania]: 'オセアニア',
  [Region.NorthAmerica]: '北アメリカ',
  [Region.CentralAmericaCaribbean]: '中央アメリカ・カリブ',
  [Region.SouthAmerica]: '南アメリカ',
};

export const regionColors: Record<Region, string> = {
  [Region.Europe]: '#3B82F6',
  [Region.WestAsia]: '#EF4444',
  [Region.Africa]: '#F59E0B',
  [Region.CentralSouthAsia]: '#10B981',
  [Region.EastAsia]: '#8B5CF6',
  [Region.SoutheastAsia]: '#F97316',
  [Region.Oceania]: '#06B6D4',
  [Region.NorthAmerica]: '#84CC16',
  [Region.CentralAmericaCaribbean]: '#EC4899',
  [Region.SouthAmerica]: '#6366F1',
};