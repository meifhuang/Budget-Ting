import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from '../components/navigation/navbar';

export const CallbackPage = () => {
  const { error } = useAuth0;

  if (error) {
    return (
      <>
        <h1>
          ERROR
        </h1>
      </>
    )
  }

    return (
      <div className="page">
        <Navbar/>
      </div>
    );
  };