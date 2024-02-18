require('dotenv').config();
const axios = require("axios"); 


const careViewBudget = async (ndis) => {
    
    const URL = process.env.CareViewURL
    

    const config = {
        headers:{
            'ApiKey' : process.env.apiKey,
        }, 
        params:{
            'subscription-key' : process.env.subscriptionKey, 
        }
    }

    try {
        const response = await axios.get(URL + ndis, config);
        const data = response.data;
        if (!data || !data.client) {
            return false;
        }
        const clientInfo ={
            suburb : data.client.suburb,
            status : data.client.status,
        }
        const budget = data.contracts.find((contract) => contract.status === 'Active');
        const clientPlan = {clientInfo, ...budget}

        return clientPlan


    } catch (error) {
        return error.message; 
    }

}

module.exports = careViewBudget