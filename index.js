import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

import debounce from "lodash.debounce";

import templateCard from "./src/templates/card.hbs";
import templateList from "./src/templates/list.hbs";
const API = "https://api.restcountries.com/countries/v5";
const API_KEY = "rc_live_10294d9c53c84da1aac818c90eff4880";

const refs = {
  input: document.getElementById("input"),
  countryBox: document.getElementById("countryBox"),
};

refs.input.addEventListener("input", debounce(processingInput, 500));

function processingInput(e) {
  fetch(
    `${API}?names.common=${refs.input.value}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.data.objects.length)
      if (data.data.objects.length > 10) {
        error({
          text: "Too many matches found. Please enter a more specific query!",
        });
        return;
      }
      if (data.data.objects.length > 1 && data.data.objects.length < 10) {
        refs.countryBox.innerHTML = "";
        const markkup = templateList(data.data);
        refs.countryBox.insertAdjacentHTML("beforeend", markkup);
        return;
      }
      if (data.data.objects.length === 1) {
        refs.countryBox.innerHTML = "";
        const markkup = templateCard(data.data.objects[0]);
        refs.countryBox.insertAdjacentHTML("beforeend", markkup);
        return;
      }
    });
}

// Comment
