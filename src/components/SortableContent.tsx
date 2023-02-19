import { Center, Text, Icon, Stack } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { IconDragDrop2 } from '@tabler/icons-react';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  children?: React.ReactNode;
  name: string;
  id: string | number;
}

const SortableContent: React.FC<Props> = (props) => {
  const { children, name, id } = props;
  const {
    isDragging,
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : 'initial',
  };
  return (
    <Stack
      direction="column"
      bg="white"
      p="2"
      border="1px"
      borderColor="gray.100"
      ref={setNodeRef}
      {...attributes}
      style={style}>
      <Stack direction="row">
        <Center {...listeners}>
          <Icon as={IconDragDrop2} fontSize="lg" />
        </Center>
        <Text fontSize={'sm'}>{name}</Text>
      </Stack>
      {children}
    </Stack>
  );
};

export default SortableContent;
