import axios from 'axios'

// Menggunakan URL project dan API Key Anon mase yang valid kemarin
const API_URL = "https://elyoefbzqtzvqmpqlqyg.supabase.co/rest/v1/user"
const API_KEY = "sb_publishable_fCw4_qEKOOuQhK4pZiC7_g_WJmF-ruu"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const userService = {
    // 1. Ambil semua data user
    async fetchUsers() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    // 2. Tambah user baru (Digunakan saat register / tambah manual)
    async createUser(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // 3. Hapus data user berdasarkan ID
    async deleteUser(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}