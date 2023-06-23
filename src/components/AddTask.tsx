import React, { FormEvent } from 'react';
import { Button, Flex, Input } from '../styles';
import { toast } from 'react-toastify';

interface IAddTask {
  handleTaskAddition: (inputData: string) => void;
}

export const AddTask = ({ handleTaskAddition }: IAddTask) => {
  const handleAddTaskClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputData = (e.currentTarget[0] as HTMLInputElement).value;

    if (!inputData) {
      toast.error('O título é obrigatório!');
      return;
    }

    handleTaskAddition(inputData);
  };

  return (
    <Flex gap={'4'} css={{ my: '$3' }} as={'form'} onSubmit={handleAddTaskClick}>
      <Input placeholder="Título da tarefa" type="text" />
      <Button type="submit">Adicionar</Button>
    </Flex>
  );
};
