import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-md font-semibold mb-4">
          
          <a href="https://arxiv.org/pdf/1809.06421.pdf" className="underline bg-green-400 text-gray-800 p-1 rounded-md">Quadratic Funding Paper (PDF)</a>{' '} by{' '}
          <a href="https://twitter.com/vitalikbuterin" className="underline bg-green-400 text-gray-800 p-1  rounded-md">@vitalikbuterin</a> ,{' '}
          <a href="https://twitter.com/zhitzig" className="underline bg-green-400 text-gray-800 p-1 rounded-md">@zhitzig</a> ,{' '}
          <a href="https://twitter.com/glenweyl" className="underline bg-green-400 text-gray-800 p-1 rounded-md">@glenweyl</a>
        </p>
        <p className="mb-4">
          This voting platform made by{' '}
          <a href="https://github.com/sanjay-sol" className="underline bg-green-400 text-gray-800 p-1 rounded-md">@sanjay-sol</a>{' '}
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/sanjay-sol" >
            <Image src="/download.jpeg" width={48} height={48} alt="GitHub Logo" />
          </a>
          <a href="https://twitter.com/SanjaySirangi">
            <Image src="/twitter.png" width={0} height={0} style={{ width: '30px', height: '30px' }} alt="Twitter Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
