import React from 'react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p>{message}</p>
        </div>                                  
    );
};

export default Error;
