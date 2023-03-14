"use strict";

class Worker {
  static counter = +localStorage.getItem("counter") || 0;
  constructor(name, type, dinner, description) {
    this._name = name;
    this._age = age;
    this._dinner = dinner;
    this._type = type;
    this._description = description;
    this._id = ++Worker.counter;
  }
  get name() {
    return this._name;
  }
  get age() {
    return this._age;
  }
  get type() {
    return this._type;
  }
  get dinner() {
    return this._dinner;
  }
  get description() {
    return this._description;
  }
  get id() {
    return this._id;
  }
  set name(str) {
    this._name = str;
  }
  set age(num) {
    this._age = num;
  }
  set type(str) {
    this._type = str;
  }
  set dinner(boolean) {
    this._dinner = boolean;
  }
  set description(str) {
    this._description = str;
  }
  deleteObj() {
    if (target.matches(".delete-button") && target.closest("tr")) {
      target.closest("tr").remove();
      workersArr.splice(index, 1);
      localStorage.removeItem("item", JSON.stringify(workersArr));
      render();
    }
  }
}

class Frontend extends Worker {
  constructor(name, type, dinner, description, ui, ux) {
    super(name, type, dinner, description, ui, ux);
    this._ui = ui;
    this._ux = ux;
  }

  get ui() {
    return this._ui;
  }
  get ux() {
    return this._ux;
  }

  set ui(str) {
    this._ui = str;
  }
  set ux(str) {
    this._ux = str;
  }

  deleteObj() {
    super.deleteObj();
  }
}
class Backend extends Worker {
  constructor(name, type, dinner, description, sql, logic) {
    super(name, type, dinner, description, sql, logic);
    this._sql = sql;
    this._logic = logic;
  }

  get sql() {
    return this._sql;
  }
  get logic() {
    return this._logic;
  }

  set sql(str) {
    this._sql = str;
  }
  set logic(str) {
    this._logic = str;
  }
  deleteObj() {
    super.deleteObj();
  }
}
class QA extends Worker {
  constructor(name, type, dinner, description, manual, regress) {
    super(name, type, dinner, description, manual, regress);
    this._manual = manual;
    this._regress = regress;
  }

  get manual() {
    return this._manual;
  }
  get regress() {
    return this._regress;
  }

  set manual(str) {
    this._manual = str;
  }
  set regress(str) {
    this._regress = str;
  }
}
class PM extends Worker {
  constructor(name, type, dinner, description, tasks, sells) {
    super(name, type, dinner, description, tasks, sells);
    this._tasks = tasks;
    this._sells = sells;
  }

  get tasks() {
    return this._tasks;
  }
  get sells() {
    return this._sells;
  }

  set tasks(str) {
    this._tasks = str;
  }
  set sells(str) {
    this._sells = str;
  }
  deleteObj() {
    super.deleteObj();
  }
}

const form = document.querySelector(".form");
const submit = document.getElementById("submit");
const dinner = document.querySelector("#dinner");
const selectWorkers = document.querySelector(".form__select");

let workersArr = [];

workersArr = localStorage.getItem("item")
  ? JSON.parse(localStorage.getItem("item"))
  : workersArr;

const hiddenWrappers = document.querySelectorAll(".wrapper");

selectWorkers.addEventListener("change", (e) => {
  hiddenWrappers.forEach((block) => {
    if (selectWorkers.options[selectWorkers.selectedIndex].value === block.id) {
      block.style.display = "flex";
      block
        .querySelectorAll("input")
        .forEach((input) => input.setAttribute("required", true));
    } else {
      block.style.display = "none";
      block
        .querySelectorAll("input")
        .forEach((input) => input.removeAttribute("required", false));
    }
  });
});

const resetField = () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  selectWorkers.value = "";
  dinner.checked = false;
  document.querySelector("textarea").value = "";
};
const render = () => {
  const table = document.querySelector("table");
  table.querySelectorAll("tr:not(:first-child)").forEach((tr) => {
    tr.remove();
  });
  workersArr.forEach((worker, index) => {
    const tr = document.createElement("tr");

    tr.classList.add("worker");
    tr.innerHTML = `<td>${worker._type}</td>
    <td>${worker._name}</td>
    <td>${worker._age}</td>
    <td>${worker._dinner ? "&#10004;" : "&#10008;"}</td>
    <td>${worker._ui || worker._sql || worker._manual || worker._tasks}</td>
    <td>${worker._ux || worker._logic || worker._regress || worker._sells}</td>
    <td>${worker._description}</td>
    <td> <button class="delete-button">Удалить</button></td>

    `;
    table.append(tr);

    localStorage.setItem("item", JSON.stringify(workersArr));

    tr.addEventListener("click", (e) => {
      if (e.target.matches(".delete-button") && e.target.closest("tr")) {
        e.target.closest("tr").remove();
        workersArr.splice(index, 1);
        localStorage.removeItem("item", JSON.stringify(workersArr));
        render();
      }
    });

    localStorage.setItem("item", JSON.stringify(workersArr));
  });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let newWorker;

  if (selectWorkers.options[selectWorkers.selectedIndex].value === "frontend") {
    // document.querySelector(".task-1").innerText =
    //   document.querySelector(".label-text").innerText;
    // document.querySelector(".task-2").innerText =
    //   document.querySelector(".label-text2").innerText;

    newWorker = new Frontend();
    newWorker.name = document.getElementById("name").value;
    newWorker.age = document.getElementById("age").value;
    newWorker.type =
      selectWorkers.options[selectWorkers.selectedIndex].textContent;
    newWorker.dinner =
      dinner.checked === false ? newWorker._dinner : !newWorker._dinner;
    newWorker.ui = document.getElementById("ui").value;
    newWorker.ux = document.getElementById("ux").value;
    newWorker.description = document.getElementById("description").value;

    workersArr.push(newWorker);
    localStorage.setItem("item", JSON.stringify(workersArr));
    console.log(newWorker);
    console.log(workersArr);
  } else if (
    selectWorkers.options[selectWorkers.selectedIndex].value === "backend"
  ) {
    newWorker = new Backend();
    newWorker.name = document.getElementById("name").value;
    newWorker.age = document.getElementById("age").value;
    newWorker.type =
      selectWorkers.options[selectWorkers.selectedIndex].textContent;
    newWorker.dinner =
      dinner.checked === false ? newWorker._dinner : !newWorker._dinner;
    newWorker.sql = document.getElementById("sql").value;
    newWorker.logic = document.getElementById("busines-logic").value;
    newWorker.description = document.getElementById("description").value;
    console.log(newWorker);

    workersArr.push(newWorker);

    localStorage.setItem("item", JSON.stringify(workersArr));
    console.log(newWorker);
    console.log(workersArr);
  } else if (
    selectWorkers.options[selectWorkers.selectedIndex].value === "qa"
  ) {
    newWorker = new QA();
    newWorker.name = document.getElementById("name").value;
    newWorker.age = document.getElementById("age").value;
    newWorker.type =
      selectWorkers.options[selectWorkers.selectedIndex].textContent;
    newWorker.dinner =
      dinner.checked === false ? newWorker._dinner : !newWorker._dinner;
    newWorker.manual = document.getElementById("manual-tests").value;
    newWorker.regress = document.getElementById("regress-tests").value;
    newWorker.description = document.getElementById("description").value;
    console.log(newWorker);

    workersArr.push(newWorker);

    localStorage.setItem("item", JSON.stringify(workersArr));
    console.log(newWorker);
    console.log(workersArr);
  } else if (
    selectWorkers.options[selectWorkers.selectedIndex].value === "pm"
  ) {
    newWorker = new PM();
    newWorker.name = document.getElementById("name").value;
    newWorker.age = document.getElementById("age").value;
    newWorker.type =
      selectWorkers.options[selectWorkers.selectedIndex].textContent;
    newWorker.dinner =
      dinner.checked === false ? newWorker._dinner : !newWorker._dinner;
    newWorker.tasks = document.getElementById("tasks").value;
    newWorker.sells = document.getElementById("sells").value;
    newWorker.description = document.getElementById("description").value;
    console.log(newWorker);

    workersArr.push(newWorker);

    localStorage.setItem("item", JSON.stringify(workersArr));
    console.log(newWorker);
    console.log(workersArr);
  }

  render();
  resetField();
});

render(workersArr);
