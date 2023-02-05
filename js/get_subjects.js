$(() => {
    const autoSuggest = [];
    const courseDictionary = {};

    fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed.');
        })
        .then(podaci => {
            const allData = podaci.data;
            console.log(allData);
            for (const course of allData) {
                autoSuggest.push(course.kolegij);
                courseDictionary[course.kolegij] = course.id;
            }
        })
        .catch(error => console.error(error));


    $('#kolegij_naziv').autocomplete({
        maxShowItems: 6,
        minLength: 2,
        source: autoSuggest,
        select: async (e, ui) => {
            const courseId = courseDictionary[ui.item.label];
            const response = await fetch(
                `https://www.fulek.com/data/api/supit/get-curriculum/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            const podaci = await response.json();
            const allData = podaci.data;

            const $tableBody = $('table tbody');
            const $lastRow = $tableBody.find('tr:last-child');
            const $newRow = $(`
                <tr>
                  <td>${allData.kolegij}</td>
                  <td>${allData.ects}</td>
                  <td>${allData.sati}</td>
                  <td>${allData.predavanja}</td>
                  <td>${allData.vjezbe}</td>
                  <td>${allData.tip}</td>
                  <td><button id="deleteRow" class='btn btn-danger'>Obriši</button></td>
                </tr>
              `);
            $lastRow.before($newRow);

            updateTotals(allData);
        }
    });

    $("#kolegij_naziv").on('click', function () {
        this.value = "";
    });

    $('table').on('click', '#deleteRow', function () {
        const currentRow = $(this).closest("tr");
        const columns = currentRow.find("td");
        updateTotals({
            ects: -Number(columns.eq(1).text()),
            sati: -Number(columns.eq(2).text()),
            predavanja: -Number(columns.eq(3).text()),
            vjezbe: -Number(columns.eq(4).text()),
        });
        $(this).closest('tr').remove();
    });

    const updateTotals = (data) => {
        $('#sumECTS').text(Number($('#sumECTS').text()) + data.ects);
        $('#sumHours').text(Number($('#sumHours').text()) + data.sati);
        $('#sumClass').text(Number($('#sumClass').text()) + data.predavanja);
        $('#sumPrac').text(Number($('#sumPrac').text()) + data.vjezbe);
    };
});