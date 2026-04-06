import {create} from 'zustand';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../api/transactions';
import { filter } from 'framer-motion/client';



const useTransactionStore = create((set,get) => ({
 transactions: [],
  loading: false,
  error: null,

  // filters
  searchQuery: '',
  filterCategory: 'all',
  filterType: 'all',
  sortBy: 'date',

setSearchQuery: (query) => set({ searchQuery: query }),
setFilterCategory: (category) => set({ filterCategory: category }),
setFilterType: (type) => set({ filterType: type }),
setSortBy: (sort) => set({ sortBy: sort }),


  fetchTransactions: async () => {
    set({ loading: true, error: null })
    try{
        const data = await getTransactions()
        set({ transactions: data, loading: false })
    }catch{
        set({ error: 'Failed to fetch transactions', loading: false })
    }
  },


  addTransaction: async (transaction) => {
    set({ loading: true, error: null })
    try {
        const newTransaction = await addTransaction(transaction)
        set((state) => ({ transactions: [...state.transactions, newTransaction], loading: false }))
    } catch (error) {
        set({ error: 'Failed to add transaction', loading: false })
    }
  },

   updateTransaction: async (id, transaction) => {
    set({ loading: true, error: null })
    try{
        const updated = await updateTransaction(id, transaction)
        set((state) => ({
            transactions: state.transactions.map((t) => (t.id === id ? updated : t)),
            loading: false
        }))
    }
    catch (error){
        set({ error: 'Failed to update transaction', loading: false })
    }
   },

   deleteTransaction: async (id) => {
    set({ loading: true, error: null })
    try {
        await deleteTransaction(id);
        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
            loading: false
        }))
    } catch (error) {
        set({ error: 'Failed to delete transaction', loading: false })      
   }
},

getFilteredTransactions: () => {
    const { transactions, searchQuery, filterCategory, filterType, sortBy } = get()
    let filtered = [...transactions]
    if (searchQuery) {
        filtered = filtered.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    }

    if (filterCategory !== 'all') {
        filtered = filtered.filter((t) => t.category === filterCategory)
    }

    if (filterType !== 'all') {
        filtered = filtered.filter((t) => t.type === filterType)
    }
    
       filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'amount') return b.amount - a.amount
      return 0
    })

    return filtered
},
}))


export default useTransactionStore