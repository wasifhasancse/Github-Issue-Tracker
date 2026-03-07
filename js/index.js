// get all issues data from API
const getAllIssues = async () => {
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const allIssuedata = await response.json();
  showAllIssues(allIssuedata.data);
}

// display all issues cards data
const showAllIssues = (allIssuedata) => {
  const allIssuesContainer = document.getElementById('issue-card-container');
  allIssuesContainer.innerHTML = '';
  allIssuedata.forEach(issueCardData => {
  console.log(issueCardData.priority);
    const issueCard = document.createElement('div');

    issueCard.innerHTML = `


    <!--High Priority Issue Card -->
          <div class="border-t-4 ${issueCardData.status === 'open' ? 'border-green-400' : 'border-purple-400'} rounded-lg bg-white shadow-md overflow-hidden">
            <div class="p-6">
              <!-- Icon and Priority Badge -->
              <div class="flex items-center justify-between mb-4">
                <div class="rounded-full flex items-center justify-center">
                  <img class="w-10 h-10" ${issueCardData.status === 'open' ? 'src="./assets/Open-Status.png" alt="Open Status"' : 'src="./assets/Closed-Status.png" alt="Closed Status"'} >
                </div>
                <span class="${issueCardData.priority === 'high' ? 'bg-red-100 text-red-600' : issueCardData.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'} font-medium px-8 py-1 rounded-full capitalize">${issueCardData.priority}</span>
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
              <p class="text-sm text-gray-500">${issueCardData.date}</p>
            </div>
          </div>


    `;
    allIssuesContainer.appendChild(issueCard);
  });
  // Implementation for displaying issues
}

// call API to get all issues data
getAllIssues();
