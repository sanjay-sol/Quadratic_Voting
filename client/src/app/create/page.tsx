"use client";
import React, { useEffect, useState } from 'react';

const Page = () => {
const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const graphqlEndpoint = 'https://api.studio.thegraph.com/query/60982/easattestations/version/latest'; 
      const recipient = '0xBe09cDb573E1553672eEC44540754b6F4d5B5112'; 


      const graphqlQuery = `
        {
          attestationsBySchemaUID: attesteds(where: { recipient: "${recipient}" }) {
            recipient
            attester
            uid
            schema
          }
        }
      `;

      try {
        const response = await fetch(graphqlEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: graphqlQuery }),
        });

        const responseData = await response.json();
          setData(responseData.data); 
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    fetchData();
}, []);

console.log(data);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            
            </div>
        </main>
    );
};

export default Page;
