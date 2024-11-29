let studentInfoForm = document.querySelector('#student-form')
let allInput = studentInfoForm.querySelectorAll('input')
let addStudentBtn = document.querySelector('#add-btn')
let deleteAllBtn = document.querySelector('#delete-all-btn')
let closeFormBtn = document.querySelector('#close-btn')
let dataList = document.querySelector('#table-dataList')
let update_btn = document.querySelector('#update-btn')
let submit_btn = document.querySelector('#submit-btn')
let search = document.querySelector('#search')
let paginationBtn = document.querySelector('.pagination-btn')
let nextBtn = document.querySelector('#next-btn')
let prevBtn = document.querySelector('#prev-btn')

//=========== open form ===========
addStudentBtn.addEventListener('click', () => {
    studentInfoForm.classList.remove('hidden')
    update_btn.disabled = true;
    submit_btn.disabled = false;
    submit_btn.classList.add('hover:scale-105')
    submit_btn.classList.add('hover:bg-green-600')
    update_btn.classList.remove('hover:scale-105')
    update_btn.classList.remove('hover:bg-red-600')
})
closeFormBtn.onclick = () => {
    studentInfoForm.classList.add('hidden')
    allInput.forEach( item => item.value = '')
}
//========== CRUD Operation ==================
let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
let profile_url = "";
let editIndex = null
  
studentInfoForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = studentData.find((data) => data.email == allInput[2].value)
    let checkRoll = studentData.find((data) => data.roll == allInput[1].value)
    if((checkEmail || checkRoll) == undefined){
        let data = {
            name : allInput[0].value,
            roll : allInput[1].value,
            email : allInput[2].value,
            dob : allInput[3].value,
            mobile : allInput[4].value,
            city : allInput[5].value,
            profile : profile_url == "" ? "logo.webp" : profile_url
        };
        if(editIndex == null){
            studentData.push(data);
        }else{
            studentData[editIndex] = data;
            editIndex = null
        }
        localStorage.setItem("studentData", JSON.stringify(studentData));
        swal("Data Saved", "successfully!", "success");
        allInput.forEach( item => item.value = '')
        studentInfoForm.classList.add('hidden')
        displayData(0, 5)
        pagination()
    }else{
        if(checkEmail){
            swal("Email already exists", "failed!", "warning")
        }else{
            swal("Roll number already exists", "failed!", "warning")
        }
    }
}

//========== display data =============
const displayData = (from, to) => {
    dataList.innerHTML = '';
    let filter = studentData.slice(from, to)
    filter.forEach( (data, index) => {
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g, "'");
        dataList.innerHTML += `
            <tr class="odd:bg-slate-100">
                <td class="py-2 px-4">${index+1}</td>
                <td class="py-2 px-4">
                    <img src="${data.profile}" class="h-8 w-8 rounded-full" alt="profile">
                </td>
                <td class="py-2 px-4 text-nowrap">${data.name}</td>
                <td class="py-2 px-4">${data.roll}</td>
                <td class="py-2 px-4">${data.email}</td>
                <td class="py-2 px-4 text-nowrap">${data.dob}</td>
                <td class="py-2 px-4">${data.mobile}</td>
                <td class="py-2 px-4 text-nowrap">${data.city}</td>
                <td class="flex justify-center gap-2 py-2 px-4">
                    <button class="bg-green-700 text-white py-1 px-2 rounded-md edit-btn" index="${index}" data="${finalData}"><i class="fas fa-edit"></i></button>
                    <button class="bg-red-700 text-white py-1 px-2 rounded-md delete-btn" index="${index}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    action();
}

const action = () => {
    //========== delete data coding ==========
    let allDelBtn = dataList.querySelectorAll('.delete-btn')
    allDelBtn.forEach(btn => {
        btn.onclick = async () => {
            let isConfirm = await confirm();
            if(isConfirm){  
                let index = btn.getAttribute("index")
                studentData.splice(index, 1); 
                localStorage.setItem("studentData", JSON.stringify(studentData));
                displayData();
            }
        }
    })
    //============== update data coding ==============
    let allEditBtn = dataList.querySelectorAll('.edit-btn')
    allEditBtn.forEach( btn => {
        btn.onclick = () => {
            let index = btn.getAttribute('index')
            let dataStr = btn.getAttribute('data')
            let finalData = dataStr.replace(/'/g, '"')
            let data = JSON.parse(finalData)
            studentInfoForm.classList.remove('hidden');
            allInput[0].value = data.name;
            allInput[1].value = data.roll; 
            allInput[2].value = data.email;
            allInput[3].value = data.dob;
            allInput[4].value = data.mobile;
            allInput[5].value = data.city;
            profile_url = data.profile; 
            update_btn.disabled = false;
            update_btn.classList.add('hover:scale-105')
            update_btn.classList.add('hover:bg-red-600')
            submit_btn.disabled = true;
            submit_btn.classList.remove('hover:scale-105')
            submit_btn.classList.remove('hover:bg-green-600')
            update_btn.onclick = () => {
                studentData[index] = {
                    name : allInput[0].value,
                    roll : allInput[1].value,
                    email : allInput[2].value,
                    dob : allInput[3].value,
                    mobile : allInput[4].value, 
                    city : allInput[5].value,
                    profile : profile_url == "" ? "logo.webp" : profile_url
                }
                localStorage.setItem("studentData", JSON.stringify(studentData));
                swal("Data Updated", "successfully!", "success");
                studentInfoForm.classList.add('hidden')
                allInput.forEach( item => item.value = '')
                displayData()
                update_btn.disabled = true;
                submit_btn.disabled = false;
            }
        }
    })
}

displayData(0, 5);

// ======== reading profile ===========
allInput[6].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[6].files[0])
    fReader.onload = (e) => {
        profile_url = e.target.result
    }
}

//================== delete all data ===================
deleteAllBtn.onclick = async () => {
    let isConfirm = await confirm();
    if(isConfirm){
        studentData = []
        localStorage.removeItem("studentData");
        displayData();
    }
}

//=========== delete confirmation ============
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure? You want to delete student data.",
            text: "Once deleted, you will not be able to recover this student data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true)
                swal("Data Deleted!", "Student data deleted successfully!", "success");
            } else {
                reject(true)
                swal("Deletion Cancelled!", "The student data was not delete.", "info");
            }
          });
    })
}

//=================== search data =================

search.oninput = () => {
    let value = search.value.toLowerCase()
    let studentRow = dataList.querySelectorAll('tr')
    studentRow.forEach( row => {
        let rowData = row.querySelectorAll('td')
        let name = rowData[2].innerHTML;
        let roll = rowData[3].innerHTML;
        let email = rowData[4].innerHTML;
        let number = rowData[6].innerHTML;
        if(name.toLowerCase().indexOf(value) != -1){
            row.style.display = ''
        }else if(roll.toLowerCase().indexOf(value) != -1){
            row.style.display = ''
        }else if(email.toLowerCase().indexOf(value) != -1){
            row.style.display = ''
        }else if(number.toLowerCase().indexOf(value) != -1){
            row.style.display = ''
        }else{
            row.style.display = 'none'
        }
    })
}

//=========== Pagination ================
const pagination = () => {
    let length = Number(studentData.length / 5)
    let skipData = 0, loadData = 5;
    if(length.toString().indexOf('.') != -1){
        length += 1;
    }
    for(let i=1; i<length; i++){
        paginationBtn.innerHTML += `
            <button skip-data="${skipData}" load-data="${loadData}" class="bg-slate-100 text-lg py-0.5 px-4 rounded-md border border-gray-300 paginate-btn">${i}</button> 
        `;
        skipData += 5;
        loadData += 5;
    }
    
    let allPaginateBtn = paginationBtn.querySelectorAll('.paginate-btn')
    allPaginateBtn[0].classList.add('active')
    allPaginateBtn.forEach( (btn, index) => {
        btn.onclick = () => {
            controlPrevAndNext(allPaginateBtn, index)
            for(let ele of allPaginateBtn){
                ele.classList.remove('active')
            }
            btn.classList.add('active')
            let skip = btn.getAttribute('skip-data')
            let load = btn.getAttribute('load-data')
            displayData(skip, load);
        }
    })
    
    //============ next btn code ============
    nextBtn.onclick = () => {
        let currentIndex = 0;
        allPaginateBtn.forEach((btn, index) => {
            if(btn.classList.contains('active')){
                currentIndex = index;
            }
        });
        allPaginateBtn[currentIndex+1].click();
        controlPrevAndNext(allPaginateBtn, currentIndex+1);
    }
    
    //============ prev btn code ============
    prevBtn.onclick = () => {
        let currentIndex = 0;
        allPaginateBtn.forEach((btn, index) => {
            if(btn.classList.contains('active')){
                currentIndex = index;
            }
        });
        allPaginateBtn[currentIndex-1].click();
        controlPrevAndNext(allPaginateBtn, currentIndex-1);
    }
}
pagination();


let controlPrevAndNext = (allPaginateBtn, currentIndex) => {
    let length = allPaginateBtn.length-1;
    if(currentIndex == length){
        nextBtn.disabled = true
        prevBtn.disabled = false
    }
    else if(currentIndex > 0){
        prevBtn.disabled = false
        nextBtn.disabled = false
    }else{
        prevBtn.disabled = true
        nextBtn.disabled = false
    }
}


