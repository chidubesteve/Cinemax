import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

//internal imports
import Error from './Error';
const RootErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <Error
            errCode="404"
            headerMessage="Oops! Page Not Found"
            bodyMessage="The page you are looking for was not found, could have been moved to a different location or doesn't exist."
          />
        );

      case 401:
        return (
          <Error
            errCode="401"
            headerMessage="Unauthorized"
            bodyMessage="You are not authorized to view this page."
          />
        );

      case 503:
        return (
          <Error
            errCode="503"
            headerMessage="Service Unavailable"
            bodyMessage="Our services are currently down. Please try again later."
          />
        );

      case 500:
        return (
          <Error
            errCode="500"
            headerMessage="Internal Server Error"
            bodyMessage="An unexpected error occurred on the server. Try refreshing the browser or return to the previous page or homepage"
          />
        );

      case 418:
        return (
          <Error
            errCode="418"
            headerMessage="I'm a teapot"
            bodyMessage="This was a joke response, but something went wrong."
          />
        );

      default:
        return (
          <Error
            errCode={error?.status || 'Unknown'}
            headerMessage="Something went wrong"
            bodyMessage={`An unexpected error occurred. ${
              error.data?.message || error.statusText || error.message
            }`}
          />
        );
    }
  }
  
  // Handle unexpected errors
  return (
    <Error
      errCode="Unknown"
      headerMessage="Unexpected Error"
      bodyMessage="An unexpected error occurred. Please try again later."
    />
  );

};

export default RootErrorBoundary;
