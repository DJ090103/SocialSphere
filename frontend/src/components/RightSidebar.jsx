import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';

const RightSidebar = () => {

    const {user} = useSelector(store=>store.auth);
    const [suggested, setSuggested] = useState([]);

    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const res = await axios.get(apiUrl('/api/v1/user/suggested'), { withCredentials: true });
                if (res.data.success) setSuggested(res.data.users);
            } catch (e) {
                // silent fail in sidebar
            }
        };
        fetchSuggested();
    }, []);

  return (
    <div className='fixed top-0 right-0 h-screen w-[60px] xl:w-[240px] border-l border-gray-300 bg-white hidden xl:block'>
        <div className='p-6'>
            <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                <Link to={`/profile/${user?._id}`}>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>{user?.username ? user.username.charAt(0).toUpperCase() : "."}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex flex-col">
                    <h1 className='font-bold text-gray-900'>
                        <Link to={`/profile/${user?._id}`}>{user?.username ? user.username : "."}</Link>
                    </h1>
                    <span className='text-sm text-gray-600'>{user?.bio ? user.bio : "No bio yet"}</span>
                </div>
            </div>  
        </div>
        <div className='px-6'>
            <h3 className='text-sm text-gray-600 mb-3'>Suggested for you</h3>
            <div className='flex flex-col gap-3'>
                {suggested.map(u => (
                    <Link key={u._id} to={`/profile/${u._id}`} className='flex items-center gap-3 p-2 rounded hover:bg-gray-50'>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={u.profilePicture} />
                            <AvatarFallback>{u.username ? u.username.charAt(0).toUpperCase() : "."}</AvatarFallback>
                        </Avatar>
                        <span className='text-sm text-gray-900 truncate'>{u.username}</span>
                    </Link>
                ))}
                {suggested.length === 0 && (
                    <div className='text-sm text-gray-500'>No suggestions right now</div>
                )}
            </div>
        </div>
    </div>
  )
}

export default RightSidebar