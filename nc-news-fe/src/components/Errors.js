import React from 'react';

export default function Errors({ status, msg }) {
  return (
    <div>
      <h2>
        {status} - {msg}
      </h2>
      <img
        id="error-img"
        src="https://i.pinimg.com/originals/9f/86/6e/9f866ecaf126ec61c3ead3dd53a5bb49.png"
        alt="crying-face"
      />
    </div>
  );
}
