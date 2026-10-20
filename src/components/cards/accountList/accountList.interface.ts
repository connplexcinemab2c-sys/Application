import React from 'react';

export interface AccountListProps {
  item: ItemProps;
  onClick: () => void;
}

export interface ItemProps {
  id: number;
  icon: React.ComponentType;
  title: string;
  navigation: string;
}
