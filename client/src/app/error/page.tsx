import React from 'react';

interface ErrorProps {
    message?: string; 
}

const Page: React.FC<ErrorProps> = ({ message }) => {
    const defaultText = 'An Unexecpected error occurred'; 

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p>{message ? message : defaultText}</p>
        </div>                                  
    );
};

export default Page;
