import { Box, Typography } from '@mui/material'
import React from 'react'
import { MdErrorOutline } from 'react-icons/md'

const FetchError = ({message}) => {
  return (
    <Box
    height="inherit"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Typography color="gray" variant="h5">
      {message} <MdErrorOutline />
      <br />
    </Typography>
  </Box>
  )
}

export default FetchError