import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const getRandom = () => {
    return Math.floor(Math.random() * 10+1);
  };
  const data = [
    {
      id: 1,
      title: "Kharabag",
      color: "red",
      textColor: "yellow",
      value: getRandom(),
      maxValue: 100,
    },
    {
      id: 1,
      title: "Kharabag",
      color: "brown",
      textColor: "white",
      value: getRandom(),
      maxValue: 4000,
    },
    {
      id: 2,
      title: "Lachin",
      color: "purple",
      textColor: "white",
      value: getRandom(),
      maxValue: 3000,
    },
    {
      id: 3,
      title: "Zangilan",
      color: "blue",
      textColor: "yellow",
      value: getRandom(),
      maxValue: 3000,
    },
  ];
  const setBarDataRandom = () => {
    let data = [...barData];
    data.map((item) => {
      return (item.value += getRandom());
    });
    setBarData(data);
  };
  useEffect(() => {
    const arr = [...barData];
    let timer;
    timer = setInterval(() => {
      arr.forEach((item, index) => {
        if (item.value > item.maxValue) {
          let data = [...barData];
          data.map((item) => {
            return (item.value = item.maxValue);
          });
          setBarData(data);
          clearInterval(timer);
        } else {
          setBarDataRandom();
        }
      });
    }, 800);
  }, []);

  function compareValues(key, order = "desc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  const [barData, setBarData] = useState(data);
  return (
    <div className="App">
      <h1>Competing Bars application</h1>
      {barData.sort(compareValues("value", "desc")).map((item, index) => {
        return (
          <div
            key={index}
            className="chart"
            style={{
              backgroundColor: item.color,
              color: item.textColor,
              width:
                item.value >= item.maxValue
                  ? "100%"
                  : (item.value * 100) / item.maxValue + "%",
              transform: `translateY(${index * 120 + 20 + "px"})`,
            }}
          >
            {item.title + "    " + item.value}
          </div>
        );
      })}
    </div>
  );
}

export default App;
