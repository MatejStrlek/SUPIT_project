
$(() => {
    const autoCompleteArr = [];
    const dictKolegij = {};
    var sum = [];

    const response = $.ajax({
        url: 'https://www.fulek.com/data/api/supit/curriculum-list/hr',
        type: 'GET',
        dataType: 'json',
        success: function (podaci) {
            console.log(podaci);
            for (let i = 0; i < podaci.data.length; i++) {
                autoCompleteArr.push(podaci.data[i]['kolegij']);
                dictKolegij[podaci.data[i]['kolegij']] = i + 1;
            }
        },
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });

    $('#kolegij_naziv').autocomplete({
        maxShowItems: 5,
        source: autoCompleteArr,
        select: function (e, ui) {
            details = $.ajax({
                url: 'https://www.fulek.com/data/api/supit/get-curriculum/' + dictKolegij[ui.item.label],
                type: 'GET',
                dataType: 'json',
                success: function (podaci) {
                    $('table tbody tr:last-child').before(`
                    <tr>
                    <td>${podaci.data.kolegij}</td>
                    <td>${podaci.data.ects}</td>
                    <td>${podaci.data.sati}</td>
                    <td>${podaci.data.predavanja}</td>
                    <td>${podaci.data.vjezbe}</td>
                    <td>${podaci.data.tip}</td>
                    <td><button id="deleteRow" class='btn btn-danger'>Obriši</button></td>
                    </tr>
                    `);
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
        }
    });

    $("#kolegij_naziv").click(function () {
        $(this).val("");
    });

    $('table').on('click', '#deleteRow', function () {
        $(this).closest('tr').remove();
    });
});