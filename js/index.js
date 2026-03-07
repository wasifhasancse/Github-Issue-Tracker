// store all issues data
const allIssuesContainer = document.getElementById("issue-card-container");
const issuesCount = document.getElementById("issues-count");
let allIssuesData;

// get all issues data from API
const getAllIssues = async () => {
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
  allIssuedata.forEach((issueCardData) => {
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `

          <!--High Priority Issue Card -->
          <div class="border-t-4 ${issueCardData.status === "open" ? "border-green-400" : "border-purple-400"} rounded-lg bg-white shadow-md overflow-hidden">
            <div class="p-6">
              <!-- Icon and Priority Badge -->
              <div class="flex items-center justify-between mb-4">
                <div class="rounded-full flex items-center justify-center">
                  <img class="w-10 h-10" ${issueCardData.status === "open" ? 'src="./assets/Open-Status.png" alt="Open Status"' : 'src="./assets/Closed-Status.png" alt="Closed Status"'} >
                </div>
                <span class="${issueCardData.priority === "high" ? "bg-red-100 text-red-600" : issueCardData.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"} font-medium px-8 py-1 rounded-full capitalize">${issueCardData.priority}</span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900 mb-3">${issueCardData.title}</h3>

              <!-- Description -->
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">${issueCardData.description}</p>

              <!-- Labels -->
              <div class="flex flex-wrap gap-2">
                <span class="bg-red-100 text-red-600 border-2 border-red-300 px-3 py-1.5 rounded-full">
                  <i class="fa-solid fa-bug"></i> BUG
                </span>
                <span class="bg-yellow-100 text-yellow-600 border-2 border-yellow-300 px-3 py-1.5 rounded-full">
                  <i class="fa-regular fa-circle-question"></i> HELP WANTED
                </span>
              </div>
            </div>

            <!-- Divider line -->
            <div class="border-t-2 border-gray-200"></div>

            <!-- Issue Number, Author and Date -->
            <div class="p-6 pt-4">
              <p class="text-sm text-gray-500 mb-1">#${issueCardData.id} by ${issueCardData.author}</p>
              <p class="text-sm text-gray-500">${issueCardData.createdAt}</p>
            </div>
          </div>
    `;
    allIssuesContainer.appendChild(issueCard);
  });
};

// get open issues data from API and display in open issues tab
const getOpenIssues = () => {
  // filter the all issues data based on the status and display only open issues
  const openIssues = allIssuesData.filter((issue) => issue.status === "open");
  showAllIssues(openIssues);
};

// get closed issues data from API and display in closed issues tab
const getClosedIssues = () => {
  // filter the all issues data based on the status and display only closed issues
  const closedIssues = allIssuesData.filter(
    (issue) => issue.status === "closed",
  );
  showAllIssues(closedIssues);
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

  buttonId === "all-issues-btn"
    ? getAllIssues()
    : buttonId === "open-issues-btn"
      ? getOpenIssues()
      : getClosedIssues();
};

// call API to get all issues data
getAllIssues();
