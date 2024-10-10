let search = document.querySelector(".search");
let select = document.querySelector(".select");
let addBtn = document.querySelector(".addBtn");
let table = document.querySelector("table");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let addInfo = document.querySelector(".add_info");
let newName = document.querySelector("#name");
let surName = document.querySelector("#surname");
let groups = document.querySelector("#groups");
let check = document.querySelector("#check");
let closeModal = document.querySelector(".closeModal");
let time = new Date();
let hour = time.getHours();
let minute = time.getMinutes();
let second = time.getSeconds();
let data = JSON.parse(localStorage.getItem("key")) || [];
let parseData = JSON.parse(localStorage.getItem("key"));
let newStorage = null;
let createElementRow = (element) => {
  element.forEach((value) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let newEdit = document.createElement("button");
    let newDelete = document.createElement("button");
    let timeItem = document.createElement("p");
    td.textContent = value.id;
    td1.textContent = value.name;
    td2.textContent = value.surname;
    td3.textContent = value.group;
    td4.textContent = value.work;
    timeItem.textContent = value.timeNecessary;
    timeItem.style.cssText = `margin-top: 0.5em; color: blue;`;
    newDelete.classList.add("delete");
    newEdit.classList.add("edit");
    newDelete.textContent = "delete";
    newEdit.textContent = "edit";
    tr.append(td);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    td.append(timeItem);
    td5.append(newEdit);
    td5.append(newDelete);
    td5.style.cssText = `display: flex; margin-top: 0.75em; align-items: center; gap: 1em`;
    tr.append(td5);
    tbody.append(tr);
    newDelete.addEventListener("click", (e) => {
      tr.remove();
      let deleteId = parseData.findIndex((item) => item.id === value.id);
      if (deleteId !== -1) {
        parseData.splice(deleteId, 1);
        location.reload();
        localStorage.setItem("key", JSON.stringify(parseData));
        parseData = JSON.parse(localStorage.getItem("key"));
        tbody.innerHTML = "";
        createElementRow(parseData);
      }
    });
    newEdit.addEventListener("click", (a) => {
      let editId = null;
      newName.value = "";
      surName.value = "";
      addBtn.click();
      let deleteId = parseData.findIndex((item) => item.id === value.id);
      if (deleteId !== -1) {
        editId = deleteId;
      }
      addInfo.addEventListener("click", (e) => {
        let newEditPerson = addPerson(
          newName.value,
          surName.value,
          groups.value,
          check.checked
        );
        newEditPerson.timeNecessary = hour + ":" + minute + ":" + second;
        parseData.splice(editId, 1, newEditPerson);
        parseData.pop();
        localStorage.setItem("key", JSON.stringify(parseData));
        tbody.innerHTML = "";
        createElementRow(parseData);
        parseData = JSON.parse(localStorage.getItem("key"));
        closeModal.click();
        location.reload();
      });
    });
  });
};

let addPerson = (name, surname, group, work) => {
  newPerson = {
    id: data[data.length - 1]?.id + 1 || 0,
    name: newName.value,
    surname: surName.value,
    group: groups.value,
    work: check.checked,
    timeNecessary: hour + ":" + minute + ":" + second,
  };
  return newPerson;
};

addInfo.addEventListener("click", (e) => {
  data.push(
    addPerson(newName.value, surName.value, groups.value, check.checked)
  );
  localStorage.setItem("key", JSON.stringify(data));
  closeModal.click();
  parseData = JSON.parse(localStorage.getItem("key"));
  tbody.innerHTML = "";
  createElementRow(parseData);
});

addBtn.addEventListener("click", (e) => {
  if (e.target.value !== "") {
    addInfo.disabled = false;
  } else {
    addInfo.disabled = true;
  }
});

newName.addEventListener("input", (e) => {
  if (e.target.value !== "" && surName.value !== "") {
    addInfo.disabled = false;
  } else {
    addInfo.disabled = true;
  }
});

surName.addEventListener("input", (e) => {
  if (e.target.value !== "" && newName.value !== "") {
    addInfo.disabled = false;
  } else {
    addInfo.disabled = true;
  }
});

let addPersonRow = (data) => {
  tbody.innerHTML = "";
  createElementRow(parseData);
};

window.addEventListener("load", () => {
  createElementRow(parseData);
});

select.addEventListener("change", (e) => {
  if (select.value === "1") {
    parseData = JSON.parse(localStorage.getItem("key"));
    parseData = parseData.filter((item) => item.group === "N1");
    tbody.innerHTML = "";
    createElementRow(parseData);
  }

  if (select.value === "12") {
    parseData = JSON.parse(localStorage.getItem("key"));
    parseData = parseData.filter((item) => item.group === "N12");
    tbody.innerHTML = "";
    createElementRow(parseData);
  }

  if (select.value === "14") {
    parseData = JSON.parse(localStorage.getItem("key"));
    parseData = parseData.filter((item) => item.group === "N14");
    tbody.innerHTML = "";
    createElementRow(parseData);
  }

  if (select.value === "0") {
    parseData = JSON.parse(localStorage.getItem("key"));
    tbody.innerHTML = "";
    createElementRow(parseData);
  }
});

search.addEventListener("input", (e) => {
  parseData = parseData.filter((item) => item.name.includes(e.target.value));
  tbody.innerHTML = "";
  createElementRow(parseData);
  parseData = JSON.parse(localStorage.getItem("key"));
});
