let currencies = []


function get_options() {
    show_currencies()
    fetch("options.php?select=kraj")
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element[1];
                option.value = element[0];
                document.getElementById("countries").append(option)
            });
        })
        .catch(err => console.log(err))
    fetch("options.php?select=material")
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element[1];
                option.value = element[0];
                document.getElementById("metals").append(option)
            });
        })
        .catch(err => console.log(err))
}

function get_options_update(id, metal_id) {
    fetch("options.php?select=kraj")
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element[1];
                option.value = element[0];
                document.getElementById("countries_U").append(option)
            });
        })
        .catch(err => console.log(err))
    fetch("options.php?select=material")
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                let option = document.createElement("option")
                option.textContent = element[1];
                option.value = element[0];
                document.getElementById("metals_U").append(option)
            });
        })
        .catch(err => console.log(err))
    document.getElementById("countries_U").value = id
    //document.getElementById("metals_U").value

    async function show_currencies() {
        document.getElementById("dane").innerHTML = ""
        await fetch("showing.php", {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                res = res.sort();
                let table = document.createElement("table");
                let th = document.createElement("th")
                res.forEach(element => {
                    currencies.push({ id: element[1], country_id: element[0], country_name: element[2], category: element[3], metal_id: element[4], year: element[5] })
                    console.log(currencies[0])
                    console.log(element)
                    let tr = document.createElement("tr")
                    for (let i = 0; i < 6; i++) {
                        if (i == 0) {
                            let td = document.createElement("td")
                            td.style.backgroundImage = "url(\"" + element[0] + ".jpg" + "\")"
                            td.style.backgroundPosition = "center"
                            td.style.backgroundSize = "cover"
                            td.innerHTML = `<span onclick=\"update_currency(${element[1]})\"">X</span>`
                            tr.append(td)
                            tr.id = element[1]
                            continue;
                        }
                        if (i == 1) {
                            continue;
                        }
                        let td = document.createElement("td")
                        td.innerHTML = element[i]
                        tr.append(td)
                    }
                    let td = document.createElement("td")
                    td.innerHTML = `<span onclick=\"delete_currency(${element[1]})\"">X</span>`
                    td.className = "x"
                    tr.append(td)
                    table.append(tr)
                });
                document.getElementById("dane").append(table)
            })
            .catch(err => console.log(err))
    }


    async function post_currency() {
        let data = {
            countries: document.getElementById("countries").value,
            currency: document.getElementById("nominal").value,
            cat: document.getElementById("cat").value,
            metals: document.getElementById("metals").value,
            year: document.getElementById("year").value,
        }
        await fetch("adding.php", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(res => show_currencies())
            .catch(err => console.log(err))
    }

    async function delete_currency(id) {
        let data = {
            id: id
        }
        await fetch("deleting.php", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(res => show_currencies())
            .catch(err => console.log(err))
    }

    async function update_currency(id) {
        await show_currencies()
        let row;
        currencies.forEach(element => {
            if (element.id == id) {
                row = element;
            }
        });
        console.log(row)
        document.getElementById(id).innerHTML = ` <td><select id="countries_U" value=\"${row.country_id}\"></select></td>
    <td><input type="text" maxlength="20" id="nominal_U" value=\"${row.country_name}\"/></td><td><input type="text" maxlength="20" id="cat_U" value=\"${row.category}\"/></td>
    <td><select id="metals_U" value=\"${row.metal_id}\"></select></td><td><input type="text" maxlength="4" id="year_U" value=\"${row.year}\"/></td><td class="accept" onclick=\"fetchUpdate(${id})\">X</td>`
        get_options_update(row.country_id, row.metal_id)
    }

    async function fetchGetValues(id) {
        let data = {
            id: id,
        }
        let res = await fetch("values.php", {
            method: "POST",
            body: JSON.stringify(data),
        })
        console.log(await res.text())
    }

    async function fetchUpdate(id) {
        let data = {
            id: id,
            country: document.getElementById("countries_U").value,
            nominal: document.getElementById("nominal_U").value,
            cat: document.getElementById("cat_U").value,
            metal: document.getElementById("metals_U").value,
            year: document.getElementById("year_U").value,
        }
        let res = await fetch("updating.php", {
            method: "POST",
            body: JSON.stringify(data),
        })
        console.log(await res.text())
        show_currencies()
    }
