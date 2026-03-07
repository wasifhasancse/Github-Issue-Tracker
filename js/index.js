// get all issues data from API
const getAllIssues = async () => {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const allIssuedata = await response.json();
  showAllIssues(allIssuedata.data);
  console.log(allIssuedata.data);
};

// display all issues cards data
const showAllIssues = (allIssuedata) => {
  const allIssuesContainer = document.getElementById("issue-card-container");
  allIssuesContainer.innerHTML = " ";
  allIssuedata.forEach((issueCardData) => {
    const issueCard = document.createElement("div");
    issueCard.className =
      "border-t-4 border-green-400 rounded-lg bg-white shadow-md overflow-hidden";
    issueCard.innerHTML = `

            <div class="p-6">
              <!-- Icon and Priority Badge -->
              <div class="flex items-center justify-between mb-4">
                <div class="rounded-full flex items-center justify-center">
                  <img class="w-10 h-10" src="./assets/Open-Status.png" alt="Open Status">
                </div>
                <span class="bg-red-100 text-red-600 font-medium px-8 py-1 rounded-full capitalize">HIGH</span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Fix Navigation Menu On Mobile Devices</h3>

              <!-- Description -->
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">The navigation menu doesn't collapse properly on mobile
                devices...
              </p>

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
              <p class="text-sm text-gray-500 mb-1">#1 by john_doe</p>
              <p class="text-sm text-gray-500">1/15/2024</p>
            </div>


    `;
    allIssuesContainer.appendChild(issueCard);
  });
  // Implementation for displaying issues
};

// call API to get all issues data
getAllIssues();
