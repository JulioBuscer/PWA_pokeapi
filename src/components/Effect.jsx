import React, { useCallback, useEffect, useState } from 'react'

const Effect = () => {
    //Agregamos un estado 
    const [pokemons, setPokemons] = useState([]);
    const [input, setInput] = useState("");
    const foto = {
        width: '15rem'
    }
    //Agregamos una función para hacer una petición a jsonPlaceHolder
    const getPokemons = useCallback(async () => {
        let route = ``;
        let usersData = [];

        if (input !== "") {
            route = `https://pokeapi.co/api/v2/pokemon/${input}`;
            const res = await fetch(route);
            const data = await res.json();
            let usersData = [];
            if (!Array.isArray(data)) {
                //Convertimos el JSON object en array
                usersData.push(data);
                //Modicamso el state
                setPokemons(usersData);
            }
            else {
                setPokemons(data);
            }
        } else {
            let cant = 151;
            for (let i = 1; i < cant; i++) {
                route = `https://pokeapi.co/api/v2/pokemon/` + i;
                const res = await fetch(route);
                const data = await res.json();
                if (!Array.isArray(data)) {
                    //Convertimos el JSON object en array
                    usersData.push(data);
                    //Modicamso el state
                }
                else {
                    setPokemons(data);
                }
            }

            setPokemons(usersData);

        }

    }, [input]);
    //Agregamos un useEffect para evitar el problema
    useEffect(() => {
        getPokemons();
    }, [input, getPokemons]);

    const handleSubmit = (e) => {
        //Evitamos el comportamiento normal del Submit
        e.preventDefault();
        //Obtenemos el valor del input.
        const text = e.target[0].value;
        setInput(text);
    }


    return (
        <>
            <h1>UseEffect</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="txtSearch" className="form-label">
                        Consultar
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="txtSearch"
                        name="inputText"
                        aria-describedby="search"
                    />
                </div>
                <button type="submit" className="btn btn-success">Consultar en Pokedex</button>
            </form>
            <div className="row">

                {pokemons.map((pokemon) => {
                    return <div key={pokemon.id} className="card col-4 m-2" style={foto}>
                        <div  className='card-header'>
                        #{pokemon.id} 
                        </div>
                        <img src={pokemon.sprites.front_default} className='card-img-top' alt="" />
                        <div className="card-body">
                            <h5 className='card-title' >
                                {capitalLetter(pokemon.name)}
                            </h5>
                            <p>
                                {pokemon.types.map((element) => {
                                    return <button className={'btn m-1 ' +
                                        pokemonType(element.type.name)}>
                                        {capitalLetter(element.type.name)}
                                    </button>
                                })}
                            </p>
                        </div>
                    </div>;
                })}
            </div>
        </>
    );
};

export default Effect


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