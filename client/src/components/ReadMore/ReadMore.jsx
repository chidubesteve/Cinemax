import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const ReadMore = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  const amountOfWords = 200;

  const splittedText = text.split(' ');
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(' ');

  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Typography style={{ width: '100%' }}>
      {isExpanded ? `${beginText} ${endText}` : `${beginText}`}
      {itCanOverflow && (
        <>
          <Button
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
            size="small"
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            disableRipple
          >
            {isExpanded ? 'show less' : 'show more'}
          </Button>
        </>
      )}
    </Typography>
  );
};

export default ReadMore;
