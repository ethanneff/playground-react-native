import React, {memo} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Button} from '../../../components';
import {useRootSelector} from '../../../utils';
import {Card} from '../components/Card';

type OrganizeButtonProps = {
  listId: string;
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const OrganizeButton = memo(function OrganizeButton({
  listId,
  onPress,
  onLayout,
}: OrganizeButtonProps) {
  const listItems = useRootSelector(
    (s) => s.completeList.items[listId].items.length,
  );
  return (
    <Card onLayout={onLayout}>
      <Button
        center
        color="primary"
        disable={listItems === 0}
        onPress={onPress}
        title="Organize"
      />
    </Card>
  );
});
