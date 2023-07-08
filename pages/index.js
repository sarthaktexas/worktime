import useSWR from 'swr'
import Message from '../components/Message'
import HeadObject from '../components/head'
import Status from '../components/Status'
import fetcher from '../lib/fetcher'

export default function Home() {
  const prompt = useSWR("/api/current-prompt", fetcher).data;
  const pictures = useSWR("/api/pictures", fetcher).data;
  return (
    <div className="dark:text-white dark:bg-black">
      <main>
        <section>
          <div className='mx-auto my-10 w-fit'>
            <Message message={`send a picture of: ${prompt}`}/>
          </div>
          <Status />
          <div className="flex flex-wrap justify-center gap-5">
            {pictures?.map(picture => (
              <img src={picture} className="w-1/3 rounded" />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
