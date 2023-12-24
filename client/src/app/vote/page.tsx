"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GET_VOTERS_QUERY } from '../../apollo/eventQuery'
import { useQuery } from '@apollo/client';
const Page = () => {
  const searchParams = useSearchParams();
  const voterId = searchParams.get('voterId');
  return (
      <div> voterId : { voterId }</div>
  )
}

export default  Page