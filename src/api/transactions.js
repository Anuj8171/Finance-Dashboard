import axios from "axios";

const BASE_URL = 'https://69d1480890cd06523d5dffff.mockapi.io'
export const api = axios.create({
    baseURL: BASE_URL
})



const getTransactions = async () =>{
    try{
        const response = await api.get('/transactions')
        return response.data
    } catch (error) {
        console.error('Error fetching transactions:', error)
        throw error
    }
}

const addTransaction = async (transaction) => {
    try {
        const respose = await api.post('/transactions', transaction)
        return respose.data
    }
    catch (error) {
        console.error('Error adding transaction:', error)
        throw error
    }
}



const updateTransaction = async (id, transaction) => {
    try {
        const response = await api.put(`/transactions/${id}`, transaction) 
        return response.data
    }catch (error){
        console.error('Error updating transaction:', error)
        throw error
    }
}


const deleteTransaction = async (id) => {
    try {
       const response= await api.delete(`/transactions/${id}`)
        return response.data
    }catch (error){
        console.error('Error deleting transaction:', error)
        throw error
    }   
}

export { getTransactions, addTransaction, updateTransaction, deleteTransaction }