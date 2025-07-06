const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
let currentKeyIndex = 0;
const keyElement = document.getElementById('key');
const newGameBtn = document.getElementById('newGameBtn');

// Почати гру
function setNextKey() {
  currentKeyIndex = Math.floor(Math.random() * keys.length);
  keyElement.textContent = keys[currentKeyIndex];
}

newGameBtn.addEventListener('click', () => {
  setNextKey();
  PNotify.success({
    text: 'Нова гра розпочата!',
    delay: 1000,
  });
});

document.addEventListener('keydown', (event) => {
  const expectedKey = keys[currentKeyIndex];
  if (event.key === expectedKey) {
    PNotify.success({
      text: `Вірно! Натисніть наступну клавішу.`,
      delay: 1000,
    });
    setNextKey();
  } else {
    PNotify.error({
      text: `Невірно! Очікується: "${expectedKey.toUpperCase()}"`,
      delay: 1500,
    });
  }
});

document.addEventListener('keypress', (event) => {
  event.preventDefault();
});

// === Графік Chart.js ===
const chartData = {
  labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
  datasets: [
    {
      label: "Продажі за останній місяць",
      data: [
        150, 220, 180, 200, 250, 300, 280, 350, 400, 380,
        420, 450, 500, 550, 600, 650, 700, 750, 800, 850,
        900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350
      ],
      backgroundColor: "rgba(33, 150, 243, 0.2)",
      borderColor: "#2196f3",
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }
  ]
};

const config = {
  type: 'line',
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Статистика продажів за останній місяць'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

const ctx = document.getElementById('sales-chart').getContext('2d');
new Chart(ctx, config);