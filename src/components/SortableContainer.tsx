import { Center, Heading, Icon, Stack } from '@chakra-ui/react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { IconDragDrop2 } from '@tabler/icons-react';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import SortableContent from './SortableContent';

interface Props {
  contents: Content[];
  children?: React.ReactNode;
  name: string;
  id: string | number;
}

const SortableContainer: React.FC<Props> = (props) => {
  const { contents, children, name, id } = props;
  const {
    isDragging,
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    zIndex: isDragging ? 999 : 'initial',
    transition,
  };

  return (
    <Stack
      direction="column"
      bg="white"
      p="8"
      spacing="6"
      ref={setNodeRef}
      {...attributes}
      style={style}>
      <Stack direction="row">
        <Center {...listeners}>
          <Icon as={IconDragDrop2} fontSize="x-large" />
        </Center>
        <Heading fontSize={'xl'}>{name}</Heading>
      </Stack>
      <SortableContext items={contents} id={'content'}>
        <Stack direction={'column'} spacing="2">
          {contents.map((content) => (
            <SortableContent
              key={content.id}
              id={content.id}
              name={content.name}
            />
          ))}
        </Stack>
      </SortableContext>
      {children}
    </Stack>
  );
};

export default SortableContainer;
