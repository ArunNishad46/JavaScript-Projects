async function getAddress(){
    const pincode = document.querySelector('#pincode').value
    const tableBody = document.querySelector('#table tbody')

    if(pincode.length !== 6 && isNaN(pincode)){
        tableBody.innerHTML = `<h3>Please give a valid 6-digit pincode</h3>`
        return;
    }

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)

        tableBody.innerHTML = ''

        if(!response.ok){
            tableBody.innerHTML = `<h3>No address found for the provided pincode</h3>`
        }else{
            const data = await response.json()

            data[0].PostOffice.forEach( address => {
                const row = document.createElement('tr')
                row.innerHTML = `
                <td>${address.Name}</td>
                <td>${address.Block}</td>
                <td>${address.District}</td>
                <td>${address.State}</td>
                `;

                tableBody.appendChild(row);
            })
        } 
    } catch (error) {
        tableBody.innerHTML = `<h3>ERROR: ${error}</h3>`
    }
}

document.querySelector('.btn').onclick = getAddress;
