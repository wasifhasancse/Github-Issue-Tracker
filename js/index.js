const allIssuesContainer = document.getElementById("issue-card-container");
const issuesCount = document.getElementById("issues-count");
// store all issues data from API
let allIssuesData;

// get format date from
const getDateFormat = (getDate) => {
  const date = new Date(getDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// loading bars
const manageLoadingBars = (isLoading) => {
  const loadingBars = document.getElementById("loading-bars");
  if (isLoading) {
    loadingBars.classList.remove("hidden");
    allIssuesContainer.classList.add("hidden");
  } else {
    loadingBars.classList.add("hidden");
    allIssuesContainer.classList.remove("hidden");
  }
};

// get all issues data from API
const getAllIssues = async () => {
  manageLoadingBars(true);
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const allIssueData = await response.json();
  allIssuesData = allIssueData.data;
  showAllIssues(allIssuesData);
};

// display all issues cards data
const showAllIssues = (allIssuedata) => {
  allIssuesContainer.innerHTML = "";
  issuesCount.textContent = `${allIssuedata.length} Issues`;
  allIssuedata.forEach((issueCardData) => {
    const issueCard = document.createElement("div");
    issueCard.className = `border-t-4 ${issueCardData.status === "open" ? "border-green-400" : "border-purple-400"} rounded-lg bg-white shadow-md cursor-pointer`;
    issueCard.setAttribute("onclick", `showIssueModal(${issueCardData.id})`);
    issueCard.innerHTML = `

          <!--High Priority Issue Card -->
          <div class="overflow-hidden flex flex-col justify-between h-full">
            <div class="p-6">
              <!-- Icon and Priority Badge -->
              <div class="flex items-center justify-between mb-4">
                <div class="rounded-full flex items-center justify-center">
                  <img class="w-10 h-10" ${issueCardData.status === "open" ? 'src="./assets/Open-Status.png" alt="Open Status"' : 'src="./assets/Closed-Status.png" alt="Closed Status"'} >
                </div>
                <span class="inline-flex rounded-full px-3 md:px-4 lg:px-6 py-1 md:py-1 lg:py-1.5 text-[9px] sm:text-[10px] md:text-xs lg:text-base font-semibold uppercase tracking-wider ${issueCardData.priority === "high" ? "bg-red-100 text-red-600" : issueCardData.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}">${issueCardData.priority}</span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900 mb-3">${issueCardData.title}</h3>

              <!-- Description -->
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">${issueCardData.description}</p>

              <!-- Labels -->
              <div class="flex flex-wrap gap-2">${getLabels(issueCardData.labels)}</div>
            </div>

            <!-- Issue Number, Author and Date -->
            <div class=" pt-4">
              <!-- Divider line -->
              <div class="border-t-2 border-gray-200"></div>

              <div class="p-6 space-y-2">
                <div class="flex justify-between">
                    <p class="text-sm text-gray-500 mb-1">#${issueCardData.id} by ${issueCardData.author}</p>
                    <p class="text-sm text-gray-500">${getDateFormat(issueCardData.createdAt)}</p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-gray-500 mb-1">Assignee: ${issueCardData.assignee.length === 0 ? "no one assignee" : issueCardData.assignee}</p>
                    <p class="text-sm text-gray-500">${getDateFormat(issueCardData.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
    `;
    allIssuesContainer.appendChild(issueCard);
    manageLoadingBars(false);
  });
};

// get labels data
const getLabels = (labelsData) => {
  // console.log(labelsData);
  const labels = labelsData.map((data) => {
    if (data.toLowerCase() === "bug") {
      return `<span class="bg-red-100 text-red-600 border-red-300 inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 rounded-full border-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-tight">
                  <i class="fa-solid fa-bug"></i> BUG
                </span>`;
    }
    if (data.toLowerCase() === "help wanted") {
      return `<span class="bg-yellow-100 text-yellow-600 border-yellow-300 inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 rounded-full border-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-tight">
                  <i class="fa-regular fa-life-ring"></i> HELP WANTED
                </span>`;
    }
    if (data.toLowerCase() === "enhancement") {
      return `<span class="bg-green-100 text-green-600 border-green-300 inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 rounded-full border-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-tight">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Enhancement
                </span>`;
    }
    if (data.toLowerCase() === "documentation") {
      return `<span class="bg-blue-100 text-blue-600 border-blue-300 inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 rounded-full border-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-tight">
                  <i class="fa-regular fa-file-lines"></i> Documentation
                </span>`;
    }
    if (data.toLowerCase() === "good first issue") {
      return `<span class="bg-purple-100 text-purple-600 border-purple-300 inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 rounded-full border-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-tight">
                  <i class="fa-solid fa-circle-exclamation"></i> Good First Issue
                </span>`;
    }
  });
  return labels.join(" ");
};

// get open issues data from API and display in open issues tab
const getOpenIssues = () => {
  manageLoadingBars(true);
  // filter the all issues data based on the status and display only open issues
  const openIssues = allIssuesData.filter((issue) => issue.status === "open");
  showAllIssues(openIssues);
  manageLoadingBars(false);
};

// get closed issues data from API and display in closed issues tab
const getClosedIssues = () => {
  manageLoadingBars(true);
  // filter the all issues data based on the status and display only closed issues
  const closedIssues = allIssuesData.filter(
    (issue) => issue.status === "closed",
  );
  showAllIssues(closedIssues);
  manageLoadingBars(false);
};

// remove active class from all tab buttons
const removeTabActiveButton = () => {
  const lessonAllButton = document.querySelectorAll(".tab-button");
  lessonAllButton.forEach((element) => {
    element.classList.remove(
      "bg-indigo-700",
      "text-white",
      "border-indigo-300",
      "hover:bg-indigo-800",
    );
    element.classList.add(
      "border-gray-300",
      "text-gray-500",
      "hover:bg-gray-200",
    );
  });
};

// active button in tab section
const activeTabButton = (buttonId) => {
  removeTabActiveButton();
  const activeButton = document.getElementById(buttonId);
  activeButton.classList.add(
    "bg-indigo-700",
    "text-white",
    "border-indigo-300",
    "hover:bg-indigo-800",
  );
  // set functionality to clicked button and display data based on the button
  buttonId === "all-issues-btn"
    ? getAllIssues()
    : buttonId === "open-issues-btn"
      ? getOpenIssues()
      : getClosedIssues();
};

// get modal data from API and display in modal
const showIssueModal = async (issueId) => {
  manageLoadingBars(true);
  // get issue data from API based on the clicked issue card
  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const getIssueData = await response.json();
  const issueData = getIssueData.data;

  // get the modal container
  const issueModal = document.getElementById("issueCardModal");
  issueModal.innerHTML = "";
  // creating modal content dynamically based on the issue data
  const modalContent = document.createElement("div");
  modalContent.innerHTML = `

        <div class="modal-box w-11/12 sm:w-[85%] md:w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg md:rounded-2xl bg-[#F8FAFC] p-4 sm:p-5 md:p-7 lg:p-8 shadow-lg mx-auto">
          <h3
            class="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight md:leading-snug text-gray-900">
            ${issueData.title}
          </h3>

          <div
            class="mt-3 sm:mt-3.5 md:mt-4 lg:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
            <span
              class="rounded-full px-2.5 sm:px-3.5 md:px-4 lg:px-5 py-0.5 sm:py-0.5 md:py-1 lg:py-1.5 text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-white ${issueData.status === "open" ? 'bg-green-500">Opened' : 'bg-red-500">Closed'}</span>
            <span class="text-gray-600 hidden sm:inline">&bull;</span>
            <span class="text-[10px] sm:text-xs md:text-sm lg:text-base">Opened by ${issueData.author}</span>
            <span class="text-gray-600 hidden sm:inline">&bull;</span>
            <span class="text-[10px] sm:text-xs md:text-sm lg:text-base">${getDateFormat(issueData.createdAt)}</span>
          </div>

          <div class="mt-3 sm:mt-3.5 md:mt-4 lg:mt-5 flex flex-wrap items-center gap-2 md:gap-2.5 lg:gap-3">${getLabels(issueData.labels)}</div>

          <p
            class="mt-4 sm:mt-4.5 md:mt-6 lg:mt-7 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose text-gray-600">
            ${issueData.description}
          </p>

          <div
            class="mt-4 sm:mt-5 md:mt-6 lg:mt-8 rounded-lg md:rounded-xl lg:rounded-2xl bg-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <p
                  class="text-[11px] sm:text-xs md:text-sm lg:text-lg text-gray-500 mb-1 md:mb-1.5 lg:mb-2 font-medium">
                  Assignee:</p>
                <p class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">
                  ${issueData.assignee.length === 0 ? "No One Assignee" : issueData.assignee}
                </p>
              </div>
              <div>
                <p
                  class="text-[11px] sm:text-xs md:text-sm lg:text-lg text-gray-500 mb-1 md:mb-1.5 lg:mb-2 font-medium">
                  Priority:</p>
                <span
                  class="inline-flex rounded-full px-3 md:px-4 lg:px-6 py-1 md:py-1 lg:py-1.5 text-[9px] sm:text-[10px] md:text-xs lg:text-base font-semibold uppercase tracking-wider ${issueData.priority === "high" ? "bg-red-100 text-red-600" : issueData.priority === "medium" ? "bg-yellow-200 text-yellow-600" : "bg-gray-200 text-gray-400"}">${issueData.priority}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 sm:mt-4.5 md:mt-6 lg:mt-8 flex justify-end">
            <form method="dialog" class="w-auto">
              <button
                class="btn w-auto h-auto border-0 bg-indigo-700 hover:bg-indigo-800 px-4 sm:px-5 md:px-6 lg:px-7 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white rounded-md md:rounded-lg lg:rounded-xl transition-all duration-200">Close</button>
            </form>
          </div>
        </div>
  `;
  issueModal.appendChild(modalContent);
  issueModal.showModal();
  manageLoadingBars(false);
};

// search functionality
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", async () => {
  const searchValue = searchInput.value.toLowerCase();
  manageLoadingBars(true);
  if (searchValue === "") {
    showAllIssues(allIssuesData);
    manageLoadingBars(false);
    return;
  }

  // get data from API for search functionality
  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  );

  const data = await response.json();
  removeTabActiveButton();
  showAllIssues(data.data);
  manageLoadingBars(false);
});

// call API to get all issues data
getAllIssues();
