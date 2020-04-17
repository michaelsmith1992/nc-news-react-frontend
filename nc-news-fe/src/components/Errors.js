import React from 'react';

export default function Errors({ status, msg }) {
  return (
    <div>
      <h2>
        {status} - {msg}
      </h2>
    </div>
  );
}
