import React, {useEffect, useState} from "react";
import axios from "axios";
import {Drawer, Button} from "antd";

const App = () => {
    const [listaLibro, setListaLibro] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [edicion, setEdicion] = useState("");
    const [autor, setAutor] = useState("");
    const [datePub, setDatePub] = useState("");
    const [capitulos, setCapitulos] = useState("");
    const [area, setArea] = useState("");
    const [editorial, setEditorial] = useState("");

    //***********************************************************************************************
    const [nombreBuscar = {nb: ""}, setNomBusc = {nb: "",}] = useState("");

    const [fechaBuscar = {db: ""}, setDateBusc = {db: "",}] = useState("");

    const [autorBuscar = {ab: ""}, setAutBusc = {ab: "",}] = useState("");

    const [capituloBuscar = {cb: ""}, setCapBusc = {db: "",}] = useState("");

    const [areaBuscar = {arb: ""}, setAreaBusc = {arb: "",}] = useState("");
    //***********************************************************************************************
    const [bandera, setBandera] = useState(true);

    useEffect(() => {
        getLibros();
    }, []);

    const getfiltroNombre = async () => {
        setDateBusc("")
        setAutBusc("")
        setCapBusc("")
        setAreaBusc("")
        const res = await axios.get( "https://libreriaportoserver.herokuapp.com/book/" + nombreBuscar);
        console.log(res);
        setListaLibro(res.data);
    };

    const getfiltroAutor = async () => {
        setDateBusc("");
        setNomBusc("");
        setCapBusc("")
        setAreaBusc("")
        const res = await axios.get("https://libreriaportoserver.herokuapp.com/autor/" + autorBuscar);
        setListaLibro(res.data);
    };


    const getfiltroDate = async () => {
        setNomBusc("")
        setAutBusc("")
        setCapBusc("")
        setAreaBusc("")
        const res = await axios.get( "https://libreriaportoserver.herokuapp.com/fecha/" + fechaBuscar);
        setListaLibro(res.data);
    };

    const getFiltroCap = async () => {
        setNomBusc("")
        setAutBusc("")
        setAreaBusc("")
        setDateBusc("")
        const res = await axios.get( "https://libreriaportoserver.herokuapp.com/capitulo/" + capituloBuscar);
        setListaLibro(res.data);
    };

    const getFiltroArea = async () => {
        setNomBusc("")
        setAutBusc("")
        setDateBusc("")
        setCapBusc("")
        console.log(areaBuscar)
        const res = await axios.get( "https://libreriaportoserver.herokuapp.com/area/" + areaBuscar);
        console.log(res)
        setListaLibro(res.data);
    };

    const refresh = () => {
        getLibros();
    };

    const getLibros = async () => {
        const res = await axios.get( "https://libreriaportoserver.herokuapp.com/book/");
        setListaLibro(res.data);
    };

    const addLibro = async () => {
        let obj = {nombre, edicion, autor, datePub, editorial, capitulos, area};
        console.log(obj)
        const res = await axios.post( "https://libreriaportoserver.herokuapp.com/book", obj);
        console.log(res);
        setNombre("");
        setEdicion("");
        setAutor("");
        setDatePub("");
        setEditorial("");
        setCapitulos("");
        setArea("");
        refresh();
    };


    const deleteLibro = async (id) => {
        const res = await axios.delete("https://libreriaportoserver.herokuapp.com/book/" + id);
        console.log(res.data);
        getLibros();
    };

    const getLibro = async (id) => {
        const res = await axios.get("https://libreriaportoserver.herokuapp.com/book/obtener/" + id);
        setId(res.data._id);
        setNombre(res.data.nombre);
        setEdicion(res.data.edicion);
        setAutor(res.data.autor);
        setDatePub(res.data.datePub);
        setEditorial(res.data.editorial);
        setCapitulos(res.data.capitulos);
        setArea(res.data.area);
        setBandera(false);
    };

    const addOrUpdateLibro = () => {
        bandera ? addLibro() : update();

    };

    const update = async () => {
        const obj = {id, nombre, edicion, autor, datePub, editorial, capitulos, area};
        const res = await axios.put("https://libreriaportoserver.herokuapp.com/book/", obj)
        console.log(res.data);
        setBandera(true);
        setNombre("");
        setEdicion("");
        setAutor("");
        setDatePub("");
        setEditorial("");
        setCapitulos("");
        setArea("");
        getLibros();
    };

    return (
        <div className="container">
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    Libreria Porto en React Responsive ☼
                </a>
            </nav>
            <br/><br/>
            <button className="btn btn-info" onClick={MostrarInfo}>Mostrar información del sitio</button><br/><br/><br/>
            <div id="informacion"></div><br/><br/>
            <div className="row">
                <div className="col-md-5">
                    <div className="card pd-2">
                        <a className="navbar-brand">REGISTRAR Y ACTUALIZAR LIBRO</a>
                        <br/>
                        <input
                            className="form-control mb-2"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Edicion"
                            value={edicion}
                            onChange={(e) => setEdicion(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Autor"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Año de publicación"
                            value={datePub}
                            onChange={(e) => setDatePub(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Capítulos"
                            value={capitulos}
                            onChange={(e) => setCapitulos(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Área"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            placeholder="Editorial"
                            value={editorial}
                            onChange={(e) => setEditorial(e.target.value)}
                        />

                        <button className="btn btn-info" onClick={addOrUpdateLibro}>
                            {bandera ? "Agregar" : "actualizar"}
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <a className="navbar-brand">
                        CONTAMOS CON {listaLibro.length} LIBROS
                    </a>
                    <br/>
                    <br/>

                    <input
                        className="form-control mb-3"
                        placeholder="Filtrar por nombre"
                        value={nombreBuscar}
                        onChange={(e) => setNomBusc(e.target.value)}
                        onKeyUp={getfiltroNombre}
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Firltrar por autor"
                        value={autorBuscar}
                        onChange={(e) => setAutBusc(e.target.value)}
                        onKeyUp={getfiltroAutor}
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Filtrar por fecha de publicación"
                        value={fechaBuscar}
                        onChange={(e) => setDateBusc(e.target.value)}
                        onKeyUp={getfiltroDate}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Filtrar por capítulos"
                        value={capituloBuscar}
                        onChange={(e) => setCapBusc(e.target.value)}
                        onKeyUp={getFiltroCap}
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Filtrar por área"
                        value={areaBuscar}
                        onChange={(e) => setAreaBusc(e.target.value)}
                        onKeyUp={getFiltroArea}
                    />
                    <button className="btn btn-danger mb-3" onClick={refresh}>Si no aparecen de nuevo los libros, da click aquí</button>
                </div>
            </div>

            <div className="row mt-4 ">

                {listaLibro.map((item) => (
                    <div key={item._id} className="col-md-4">
                        <div className="card p-3 m-2 border-info">

                            <p><b>Nombre:</b> {item.nombre}</p>
                            <p><b>Edicion:</b> {item.edicion}</p>
                            <p><b>Autor:</b> {item.autor}</p>
                            <p><b>Año de publicación:</b> {item.datePub}</p>
                            <p><b>Capítulos:</b> {item.capitulos}</p>
                            <p><b>Área:</b> {item.area}</p>
                            <p><b>Editorial:</b> {item.editorial}</p>
                            <div className="d-flex flex-row-reverse">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteLibro(item._id)}
                                >
                                    Eliminar
                                </button>
                                <button
                                    className="btn btn-success mr-2"
                                    onClick={() => getLibro(item._id)}
                                >
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MostrarInfo = () => {

        document.getElementById("informacion").innerHTML = "<div className=\"card\">\n" +
            "            <div className=\"card-body\">\n" +
            "                <h5 className=\"card-title\">¿Cómo se hizo este programa?</h5>\n" +
            "                <p className=\"card-text\">\n" +
            "                    Es un sistema distribuido donde la Base de datos está en MongoDb\n" +
            "                    <br/><br/>\n" +
            "                    -->Esta está alojada en MongoDBAtlas en un servidor de AWS\n" +
            "                    <br/><br/>\n" +
            "                    -->El servidor está alojado en heroku\n" +
            "                    <br/><br/>\n" +
            "                    -->La parte del cliente está hecha en React <br/><br/>\n" +
            "                    -->Está alojado en Netlify\n" +
            "                </p>\n" +
            "                <a href=\"\" className=\"card-link\">Código</a>\n" +
            "                <a href=\"https://libreriaportoserver.herokuapp.com\" className=\"card-link\">Ruta del servidor</a>\n" +
            "            </div>\n" +
            "        </div>"

}


export default App;
