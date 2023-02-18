import { Box, Container, Stack } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { fakeData } from '../data/data';
import SortableContainer from './SortableContainer';

const Builder = () => {
  const [containers, setContainers] = useState<Container[]>(fakeData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      try {
        // sort containers
        if (active?.data?.current?.sortable.containerId === 'container') {
          if (over) {
            const oldIndex = containers
              .map((container) => container.id)
              .indexOf(active?.id);
            const newIndex = containers
              .map((container) => container.id)
              .indexOf(over?.id);

            const newContainers = arrayMove(containers, oldIndex, newIndex);
            setContainers(newContainers);
          }
        } else if (active?.data?.current?.sortable.containerId === 'content') {
          if (over) {
            const currentContainer = containers.filter((container) => {
              return container.contents.filter(
                (content) => content.id === over.id
              )[0];
            })[0];

            const currentContainerIndex = containers
              .map((container) => container.id)
              .indexOf(currentContainer.id);

            const oldIndex = containers[currentContainerIndex].contents
              .map((content) => content.id)
              .indexOf(active?.id);
            const newIndex = containers[currentContainerIndex].contents
              .map((content) => content.id)
              .indexOf(over?.id);

            const newContents = arrayMove(
              containers[currentContainerIndex].contents,
              oldIndex,
              newIndex
            );

            const tempContainers = [...containers];
            tempContainers[currentContainerIndex].contents = newContents;

            setContainers(tempContainers);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box bg="gray.100" minH={'100vh'} pt="8">
      <Container maxW={'container.xl'}>
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <Stack direction="column" spacing="4">
            <SortableContext
              id={'container'}
              items={containers}
              strategy={verticalListSortingStrategy}>
              {containers.map((container) => (
                <SortableContainer
                  key={container.id}
                  id={container.id}
                  name={container.name}
                  contents={container.contents}
                />
              ))}
            </SortableContext>
          </Stack>
        </DndContext>
      </Container>
    </Box>
  );
};

export default Builder;
