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
                `https://www.fulek.com/data/api/supit/get-curriculum/${courseId}`,
                {
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

            const updateTotals = ({ ects, sati, predavanja, vjezbe }) => {
                $('#sumECTS').text(Number($('#sumECTS').text()) + ects);
                $('#sumHours').text(Number($('#sumHours').text()) + sati);
                $('#sumClass').text(Number($('#sumClass').text()) + predavanja);
                $('#sumPrac').text(Number($('#sumPrac').text()) + vjezbe);
            };

            updateTotals(allData);
        }
    });

    $("#kolegij_naziv").on('click', function () {
        this.value = "";
    });

    $('table').on('click', '#deleteRow', function () {
        const currentRow = $(this).closest("tr");
        const columns = currentRow.find("td");
        const currentECTS = Number(columns.eq(1).text());
        const currentHours = Number(columns.eq(2).text());
        const currentClass = Number(columns.eq(3).text());
        const currentPrac = Number(columns.eq(4).text());

        $('#sumECTS').text(Number($('#sumECTS').text()) - currentECTS);
        $('#sumHours').text(Number($('#sumHours').text()) - currentHours);
        $('#sumClass').text(Number($('#sumClass').text()) - currentClass);
        $('#sumPrac').text(Number($('#sumPrac').text()) - currentPrac);

        $(this).closest('tr').remove();
    });
});