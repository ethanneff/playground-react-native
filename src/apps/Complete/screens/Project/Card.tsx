import React, {memo} from 'react';
import {Text, TouchableOpacity} from '../../../../components';
import {CardObject} from './types';

type CardProps = {
  card: CardObject;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
};

export const Card = memo(function Card({
  card,
  padding,
  borderRadius,
  backgroundColor,
}: CardProps) {
  return (
    <TouchableOpacity
      key={card.id}
      style={{
        borderRadius,
        padding: padding,
        backgroundColor,
        marginBottom: padding / 2,
      }}>
      <Text title={card.name} />
    </TouchableOpacity>
  );
});
