const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );    
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');

  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden')
  }
console.log('is show all', isShowAll);

  // console.log(phones.length);

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // console.log(phone);
    // 1 creat a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;

    // 2 set inner html
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}"></figure>
          <div class="card-body text-center">
            <h2 class="card-title justify-center font-bold">${phone.phone_name}</h2>
            <p>There are many variations of passages <br> of available, but the majority <br> have suffered</p>
            <div class="card-actions justify-center mt-3">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent">Show Details</button>
            </div>
          </div>
          `;    
    // append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoading(false);
}
// 
const handleShowDetail = async (id) => {
  // console.log('click show details', id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt=""/>
  <p><span class="font-bold text-lg">Storage : </span>${phone?.mainFeatures?.storage}</p>
  <p><span class="font-bold text-lg">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="font-bold text-lg">Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold text-lg">Memory :</span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold text-lg">Slug :</span>${phone?.slug}</p>
  <p><span class="font-bold text-lg">Release data :</span>${phone?.releaseDate}</p>
  <p><span class="font-bold text-lg">Brand :</span>${phone?.brand}</p>
  <p><span class="font-bold text-lg">GPS :</span>${phone?.others?.GPS}</p>
  `;


  // show the modal
  show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  const searchFild = document.getElementById('input-serch');
  toggleLoading(true);
  const searchText = searchFild.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}


const toggleLoading = (isLoading) => {
  const lodingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    lodingSpinner.classList.remove('hidden');
  } else {
    lodingSpinner.classList.add('hidden')
  }
}


// handle show all
const handleShowAll = () => {
  handleSearch(true)
}
// loadPhone();