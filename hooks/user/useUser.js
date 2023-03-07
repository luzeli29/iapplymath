import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useUser(id) {
    const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
   
    return {
      user: data,
      isLoading,
      error: error
    }
}

