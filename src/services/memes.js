export const getAllMemes = async(url = null) => {
    try{
        const response = await fetch(url ? url : process.env.REACT_APP_BASE_URL, {
            method: "GET",
        })
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}