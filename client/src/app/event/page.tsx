"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const secret_key = searchParams.get('secret_key');


  return (
    <div>
          <h1>id :  {id} </h1>
      <label>
        secret_key: {secret_key}
      </label>

    </div>
  );
};

export default Page;
