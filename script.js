const dateArray = [
  "24-Apr-2024",
  "02-May-2024",
  "09-May-2024",
  "31-May-2024",
  "21-Jun-2024",
];

const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Bull Call Spread",
      ],
      "02-May-2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09-May-2024": [
        "Strategy Put",
        "Strategy Call",
        "Strategy Call",
        "Strategy Call",
        "Strategy Put",
      ],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": [
        "Bear Call Spread",
        "Bear Call Spread",
        "Bear Call Spread",
        "Long Put",
        "Long Put",
        "Long Put",
        "Bear Call Spread",
      ],
      "31-May-2024": [
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
      ],
      "21-Jun-2024": [
        "Strategy3",
        "Strategy3",
        "Bear Put Spread",
        "Strategy3",
        "Long Put",
        "Long Put",
      ],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02-May-2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21-Jun-2024": [
        "Iron Condor",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Condor",
      ],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy1",
        "Strategy1",
        "Spread-Strategy",
        "Long Straddle",
      ],
      "09-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Long Straddle",
      ],
      "31-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
      ],
    },
  },
];

const viewToggle = document.getElementById("viewToggle");
const dateSelect = document.getElementById("dateSelect");
const strategyList = document.getElementById("strategyList");

let currentView = "Bullish";
let currentDate = dateArray[0];

const renderViewButtons = () => {
  viewToggle.innerHTML = "";
  const fragment = document.createDocumentFragment();

  strategyArray.forEach(({ View }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = View;
    button.className = `view-button${View === currentView ? " active" : ""}`;
    button.addEventListener("click", () => {
      if (currentView !== View) {
        currentView = View;
        renderViewButtons();
        renderStrategies();
      }
    });
    fragment.appendChild(button);
  });

  viewToggle.appendChild(fragment);
};

const renderDateOptions = () => {
  dateSelect.innerHTML = "";
  dateArray.forEach((date, index) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    if (index === 0) option.selected = true;
    dateSelect.appendChild(option);
  });

  dateSelect.addEventListener("change", (event) => {
    currentDate = event.target.value;
    renderStrategies();
  });
};

const formatStrategyLabel = (count) =>
  count === 1 ? "1 Strategy" : `${count} Strategies`;

const renderStrategies = () => {
  strategyList.innerHTML = "";
  const viewData = strategyArray.find((item) => item.View === currentView);
  const strategies = viewData?.Value?.[currentDate];

  if (!strategies || strategies.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <p>There are no strategies for</p>
      <p><strong>${currentDate}</strong></p>
    `;
    strategyList.appendChild(emptyState);
    return;
  }

  const counts = strategies.reduce((acc, strategy) => {
    acc[strategy] = (acc[strategy] || 0) + 1;
    return acc;
  }, {});

  Object.entries(counts).forEach(([name, count]) => {
    const card = document.createElement("article");
    card.className = "strategy-card";

    const strategyName = document.createElement("span");
    strategyName.className = "strategy-name";
    strategyName.textContent = name;

    const strategyCount = document.createElement("span");
    strategyCount.className = "strategy-count";
    strategyCount.textContent = formatStrategyLabel(count);

    card.appendChild(strategyName);
    card.appendChild(strategyCount);
    strategyList.appendChild(card);
  });
};

const initializeApp = () => {
  renderViewButtons();
  renderDateOptions();
  renderStrategies();
};

initializeApp();
