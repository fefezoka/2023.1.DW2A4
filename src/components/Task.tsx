import React from 'react';
import { CgClose, CgInfo } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalTrigger,
  Text,
} from '../styles';

interface ITask {
  task: Task;
  handleTaskClick: (id: string) => void;
  handleTaskDeletion: (id: string) => void;
}

export const Task = ({ task, handleTaskClick, handleTaskDeletion }: ITask) => {
  const navigate = useNavigate();

  const handleTaskDetailsClick = () => {
    navigate(`/${task.title}`);
  };

  return (
    <Flex
      align={'center'}
      css={{
        p: '0 $6',
        bc: '$bg3',
        mt: '$2',
        br: '$3',
        minHeight: 48,
        ...(task.completed && { borderLeft: '6px solid $blue10' }),
      }}
      justify={'between'}
      gap={'4'}
    >
      <Box onClick={() => handleTaskClick(task.id)}>
        <Text>{task.title}</Text>
      </Box>
      <Flex gap={'2'}>
        <Flex as={'button'} onClick={handleTaskDetailsClick}>
          <CgInfo size={18} color="var(--colors-blue10)" />
        </Flex>

        <Modal>
          <ModalTrigger asChild>
            <Flex as={'button'}>
              <CgClose size={18} color="var(--colors-blue10)" />
            </Flex>
          </ModalTrigger>
          <ModalContent>
            <Box
              as={'form'}
              onSubmit={(e) => {
                e.preventDefault();
                handleTaskDeletion(task.id);
              }}
            >
              <Heading size="2" css={{ mb: '$2' }} color={'red'}>
                Deletar tarefa
              </Heading>
              <Flex direction={'column'} gap={'1'}>
                <Text>Deseja mesmo deletar a tarefa de id {task.id}?</Text>
                <Text>Essa ação é irreversível.</Text>
              </Flex>
              <Box css={{ mt: '$6' }}>
                <Button type="submit" css={{ width: '100%' }} variant={'red'}>
                  Deletar
                </Button>
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};
