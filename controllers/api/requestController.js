const axios = require('axios');

const apiRequest = async (router) => {

        const route = router.route
        const url = router.ip
        const type = router.type
        const body = JSON.stringify(router.data)
        const user = router.accountUser
        const pass= router.accountPass
        const axiosURL = 'https://'+url+'/rest'+route

        if (!route || !url || !type || !user || !pass) {
            return ({ error: 'All fields are required' });
          }

        const config = {
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Basic ' + Buffer.from(user + ':' + pass).toString('base64')
            },
            agent: new https.Agent({
              rejectUnauthorized: false // Disable SSL verification
            }),
        }

       if(type === 'GET'){
          config.method = 'GET'
          try {
            const response = await axios.get(axiosURL, config);
            return (response.data);
          } catch (error) {
            console.error(error);
            return ({ error: 'Error fetching data' });
          }
       }else if(type === 'POST'){
          config.method = 'POST'
           config.body = body
          try {
            const response = await axios.post(axiosURL, body, config);
            return (response.data);
          } catch (error) {
            console.error(error);
            return ({ error: 'Error fetching data' });
          }
       }else if(type === 'DELETE'){
          config.method = 'DELETE'
           config.body = body
          try {
            const response = await axios.delete(axiosURL, config);
            return (response.data);
          } catch (error) {
            console.error(error);
            return ({ error: 'Error deleting data', error });
          }
       }else if(type === 'PUT'){
          config.method = 'PUT'
           config.body = body
          try {
            const response = await axios.put(axiosURL, body, config);
            return (response.data);
          } catch (error) {
            console.error(error);
            return ({ error: 'Error putting data', error });
          }
       }else if(type === 'PATCH'){
          config.method = 'PATCH'
          config.body = body
          try {
            const response = await axios.patch(axiosURL, body, config);
            return (response.data);
          } catch (error) {
            console.error(error);
            return ({ error: 'Error patching data', error });
          }
       }
       else{
       return({ message: 'Invalid Method' });
       }

           
}

module.exports = { apiRequest };
