import { Box } from './Box';
import { CSS, keyframes } from './stitches.config';

const Glow = keyframes({
  '0%, 100%': {
    backgroundColor: '$bg2',
  },
  '50%': {
    backgroundColor: '$bg3',
  },
});

export const Line = ({ rows, css }: { rows?: number; css: CSS }) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <Box
          key={index}
          css={{
            animation: `${Glow} 0.8s ease-out 0s infinite normal`,
            br: '$2',
            ...(rows && rows > 1 && { mb: '$2' }),
            ...css,
          }}
        />
      ))}
    </>
  );
};
