const buttons = document.querySelectorAll("ul#job>li>button");
buttons.forEach((einButton) => {
    einButton.addEventListener("click", (event) => {
        event.preventDefault();

        const lösch_id= event.target.parentNode.id;
        console.log(lösch_id);

        fetch("/jobs/"+lösch_id, {
            method: 'DELETE', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: lösch_id })}).then( (ergebnis) => {
                ergebnis.json().then(
                    (objekt) => {
                        console.log(objekt)
                        event.target.parentNode.innerText = objekt.result;
                    }
                )
            //console.log(ergebnis);
        }).catch( (fehler) => {
            console.error(fehler);
        })
    })
})