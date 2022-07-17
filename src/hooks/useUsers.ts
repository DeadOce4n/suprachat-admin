import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { debounce } from 'lodash'
import { User } from '../types/interfaces'
import { findUsers } from '../services/users'
import { useStore } from '../hooks/useStore'

interface Return {
  isLoading: boolean
  users: Array<User>
  page: number
  limit: number
  count: {
    total: number
    actual: number
    filtered: number
  }
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  error: { error: boolean, message: string }
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const useUsers = (): Return => {
  const [error, setError] = useState<{
    error: boolean,
    message: string
  }>({ error: false, message: '' })
  const {
    isLoading,
    users,
    page,
    limit,
    count,
    setIsLoading,
    setUsers,
    setPage,
    setLimit,
    setCount
  } = useStore(({
    isLoading,
    users,
    page,
    limit,
    count,
    setIsLoading,
    setUsers,
    setPage,
    setLimit,
    setCount
  }) => ({
    isLoading,
    users,
    page,
    limit,
    count,
    setIsLoading,
    setUsers,
    setPage,
    setLimit,
    setCount
  }))
  const [filter, setFilter] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const data = await findUsers({ filter, page, limit })
        setUsers(data.users)
        setCount(data.count)
        setIsLoading(false)
      } catch (e: any) {
        setIsLoading(false)
        if (e.message) setError({ error: true, message: e.message })
      }
    })()
  }, [filter, page, limit])

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const debouncedHandler = useCallback(debounce(handleFilterChange, 300), [])

  return {
    isLoading,
    users,
    page,
    limit,
    count,
    setPage,
    setLimit,
    error,
    handleFilterChange: debouncedHandler
  }
}
