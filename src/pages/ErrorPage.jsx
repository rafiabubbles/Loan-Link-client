import React from 'react';
import img from '../assets/error-404.png'

const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <img src={img} alt="404 Error" />
        </div>
    );
};

export default ErrorPage;