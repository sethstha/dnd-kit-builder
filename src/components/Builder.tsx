import { Box, Button, Container, Heading, Link, Stack } from '@chakra-ui/react';
import {
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
import { IconBrandGithub } from '@tabler/icons-react';
import React, { useState } from 'react';
import { fakeData } from '../data/data';
import SortableContainer from './SortableContainer';

const Builder: React.FC = () => {
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
    <Stack direction="column" bg="gray.100" align="center" spacing="8" pb="8">
      <Box as="header" bg="white" w="full" py="4">
        <Container maxW={'container.xl'}>
          <Stack
            direction="row"
            justify="space-between"
            align="center"
            height="6">
            <Heading fontSize="md">
              React.js, TypeScript and @dnd-kit course builder
            </Heading>
            <Link
              target="_blank"
              href="https://github.com/sethstha/dnd-kit-builder">
              <Button leftIcon={<IconBrandGithub />}>Github</Button>
            </Link>
          </Stack>
        </Container>
      </Box>
      <Container maxW={'container.xl'}>
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <Stack direction="column" spacing="8">
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
    </Stack>
  );
};

export default Builder;
