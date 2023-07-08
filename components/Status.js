import fetcher from '../lib/fetcher';
import useSWR from 'swr';

export default function Status({name, submitted}) {
    const users = useSWR("/api/statuses", fetcher).data;
    return (
        <div className="flex flex-wrap mx-auto w-[30vw] pb-10 gap-2">
            {users?.map(({name, submitted}) => (
                <span className={`whitespace-nowrap rounded-full ${submitted ? 'text-green-600' : 'text-gray-800'} px-2.5 py-0.5 text-sm ${submitted ? 'bg-green-200' : 'bg-gray-200'} border ${submitted ? 'border-green-600' : 'border-gray-800'}`}>
                    {name}
                </span>
            ))}
        </div>
    )
}