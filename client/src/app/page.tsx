"ue client"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      {/* Your existing code */}
      <button className='bg-green-300 text-black p-4 rounded-md'>
      <a href="/create">
          Go to Create Page
        </a>
      </button>
       <button className='bg-violet-300 text-black p-4 rounded-md m-3'>
      <a href="/place">
          Place your Votes
        </a>
        </button>
    </main>
  )
}
