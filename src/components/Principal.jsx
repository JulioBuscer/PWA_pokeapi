import React from 'react'
import '../style/style.css'

const Principal = () => {
    pokeApi(150);
    return (
        <div className="row bg-pkm" id="listado" name="listado">

        </div>
    )
}

const pokeApi = async (cant) => {
    let str = "";
    for (let i = 1; i <= cant; i++) {
        let pk = await fetch('https://pokeapi.co/api/v2/pokemon/' + i + '/');
        let pokemon = await pk.json();
        console.log(pokemon)
        str += '<div class="card col-4 m-2" style = "width: 15rem;" > ' +
            '<img src="' + pokemon.sprites.front_default + '" class="card-img-top" alt="...">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + capitalLetter(pokemon.name) + '     No°' + pokemon.id + '</h5>' +
            '<p class="card-text">  </p>'
        pokemon.types.forEach(element => {

            str += '<btn class="btn ' + pokemonType(element.type.name) + ' m-1">' + capitalLetter(element.type.name) + ' </btn>'
        });
        str += '</div>  </div>'
    }
    document.getElementById("listado").innerHTML = str;
}

const capitalLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonType = (type) => {
    switch (type) {
        case "grass":
            type = "btn-success";
            break;
        case "fire":
            type = "btn-danger";
            break;
        case "electric":
            type = "btn-warning";
            break;
        case "normal":
            type = "btn-secondary";
            break;
        case "water":
            type = "btn-info";
            break;
        case "dark":
            type = "btn-dark";
            break;

        default:
            type = "btn-primary";
            break;
    }
    return type;
}

export default Principal
