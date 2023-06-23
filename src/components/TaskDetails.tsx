import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Text } from '../styles';
import { IoArrowUndoCircle } from 'react-icons/io5';

export const TaskDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <Box css={{ position: 'absolute', top: 30, right: 32, cursor: 'pointer' }}>
        <IoArrowUndoCircle
          color="var(--colors-blue10)"
          size={30}
          onClick={handleBackButtonClick}
        >
          Voltar
        </IoArrowUndoCircle>
      </Box>
      <Box css={{ p: '$4', bc: '$bg3', mt: '$4', br: '$2' }}>
        <Heading css={{ mb: '$2' }}>{params.taskTitle}</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>
      </Box>
    </Box>
  );
};
