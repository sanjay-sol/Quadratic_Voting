import Image from 'next/image';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-6 md:p-12 lg:p-24 xl:p-32 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-white text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
          Welcome to Quadratic Voting 🚀
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Host a Quadratic Voting Event Below!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
        <button className='bg-green-300 text-black p-4 rounded-md shadow-md hover:shadow-lg'>
          <Link href="/create?isAttest=false">
            Create an Event
          </Link>
        </button>
        <button className='bg-green-300 text-black p-4 rounded-md shadow-md hover:shadow-lg'>
          <Link href="/create?isAttest=true">
            Create an Event with Attestations
          </Link>
        </button>
        <button className='bg-violet-300 text-black p-4 rounded-md shadow-md hover:shadow-lg'>
          <Link href="/place">
            Place your Votes
          </Link>
        </button>
      </div>
    </main>
  );
};

export default Home;
