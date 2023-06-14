import "./AddPokemon.css";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions/index";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const defaultValuesError = {
  Nombre: "",
  Imagen: "",
  Vida: "",
  Ataque: "",
  Defensa: "",
  Velocidad: "",
  Altura: "",
  Peso: "",
  tipo: "El Pokemon por lo menos debe ser de un tipo",
};

const defaultValues = {
  Nombre: "",
  Imagen: "",
  Vida: 0,
  Ataque: 0,
  Defensa: 0,
  Velocidad: 0,
  Altura: 0,
  Peso: 0,
  tipo: [],
};
const AddPokemon = (props) => {
  const dispatch = useDispatch();
  const { types, getTypes } = props;
  const [tipo, setTipo] = useState(-1);

  const history = useHistory();

  useEffect(() => {
    getTypes();
  }, [getTypes]);

  const [form, setForm] = useState(defaultValues);

  const [errors, setErrors] = useState(defaultValuesError);

  const validate = (state, errorsState) => {
    const { Nombre, tipo, Vida, Ataque, Defensa } = state;
    const errors = { ...errorsState };
    console.log(Nombre.length);
    if (Nombre.length > 30)
      errors.Nombre = "Nombre del Pokemon es demasiado largo";
    if (Nombre.length === 0) {
      errors.Nombre = "El nombre del Pokemon no puede quedar vacío";
    } else errors.Nombre = "";
    if (tipo.length === 0)
      errors.tipo = "El Pokemon por lo menos debe ser de un tipo";
    else errors.tipo = "";
    if (Number(Vida) === 0 || Number(Vida) < 0 || Number(Vida) > 9999) {
      errors.Vida = "El valor de vida del Pokemon es invalida";
    } else errors.Vida = "";
    if (Number(Ataque) === 0 || Number(Ataque) < 0) {
      errors.Ataque =
        "El valor de Ataque del Pokemon no puede ser cero o menor";
    } else errors.Ataque = "";
    if (Number(Defensa) === 0 || Number(Defensa) < 0) {
      errors.Defensa = "El valor de defensa del Pokemon es invalida";
    } else errors.Defensa = "";

    return errors;
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    const err = validate({ ...form, [property]: value }, errors);
    setErrors({ ...err });
  };

  const generatelog = () => {
    return `${errors.Nombre}${errors.Imagen}${errors.Vida}${errors.Ataque}${errors.Defensa}${errors.Velocidad}${errors.Altura}${errors.Peso}${errors.tipo}`;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const log = generatelog();

    console.log(log.length);
    if (log.length === 0) {
      const values = {
        pokemon: { ...form },
        types: form.tipo.map(({ id }) => id),
      };
      delete values.pokemon.tipo;
      Promise.resolve(dispatch(actions.createPokemon(JSON.stringify(values))))
        .then((r) => {
          console.log(r);
          setForm(defaultValues);
          setErrors(defaultValuesError);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleShowGeneros = () => {
    const val = form.tipo.map(({ id }) => {
      return types.find((type) => type.id === id);
    });
    return val;
  };

  const handleSetGenero = (event) => {
    setTipo(Number(event.target.value));
  };

  const handleAddTipos = () => {
    if (tipo !== -1) {
      const item = types.find(({ id }) => id === tipo);
      if (item !== undefined) {
        setForm({ ...form, tipo: [...form.tipo, item] });
        setErrors(validate({ ...form, tipo: [...form.tipo, item] }, errors));
      }
    }
    setTipo(-1);
  };

  const filterselectedTypes = ({ id }) =>
    form.tipo.find((type) => type.id === id) !== undefined ? false : true;

  const handleDelete = (id) => {
    setForm({
      ...form,
      tipo: form.tipo.filter((gen) => gen.id !== id),
    });
    setErrors(
      validate(
        { ...form, tipo: form.tipo.filter((gen) => gen.id !== id) },
        errors
      )
    );
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="data_pokemon">
        {form.Imagen.length !== 0 && (
          <div>
            <img
              src={form.Imagen}
              alt="imagen"
              className="imagen_form_pokemon"
            />
          </div>
        )}
        <div className="item_form">
          <label htmlFor="Imagen">URL Imagen: </label>
          <input
            type="url"
            name="Imagen"
            className="field"
            value={form.Imagen}
            onChange={handleChange}
          />
        </div>
        <div className="item_form">
          <label htmlFor="Nombre">Nombre: </label>
          <input
            type="text"
            name="Nombre"
            className="field"
            value={form.Nombre}
            onChange={handleChange}
          />
        </div>
        <div className="item_form">
          <label htmlFor="Vida">Vida: </label>
          <input
            type="number"
            name="Vida"
            className="field"
            value={form.Vida}
            onChange={handleChange}
          />
        </div>

        <div className="item_form">
          <label htmlFor="Ataque">Ataque: </label>
          <input
            type="number"
            name="Ataque"
            className="field"
            value={form.Ataque}
            onChange={handleChange}
          />
        </div>

        <div className="item_form">
          <label htmlFor="Defensa">Defensa: </label>
          <input
            type="number"
            name="Defensa"
            className="field"
            value={form.Defensa}
            onChange={handleChange}
          />
        </div>
        <div className="item_form">
          <label htmlFor="rating">Velocidad: </label>
          <input
            type="number"
            name="Velocidad"
            className="field"
            value={form.Velocidad}
            onChange={handleChange}
          />
        </div>
        <div className="item_form">
          <label htmlFor="Altura">Altura: </label>
          <input
            type="number"
            name="Altura"
            className="field"
            value={form.Altura}
            onChange={handleChange}
          />
        </div>
        <div className="item_form">
          <label htmlFor="Peso">Peso: </label>
          <input
            type="number"
            name="Peso"
            className="field"
            value={form.Peso}
            onChange={handleChange}
          />
        </div>
        <div className="item_multiple">
          <div className="item_form">
            <div>
              <select
                placeholder="Tipos"
                className="selecfilters"
                value={tipo}
                onChange={handleSetGenero}
              >
                <option value={-1}>Tipos</option>
                {types.filter(filterselectedTypes).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button className="AddPokemon" onClick={handleAddTipos}>
                Agregar Tipo
              </button>
            </div>
          </div>
          <ul className="list generos">
            {handleShowGeneros().map((gen) => (
              <div className="item_form">
                <li>{gen.name} </li>
                <button
                  className="delete"
                  onClick={() => handleDelete(gen.id)}
                ></button>
              </div>
            ))}
          </ul>
        </div>
        <br />
        {generatelog().length !== 0 && (
          <div className="error_container">
            {Boolean(errors.Nombre) && (
              <p className="error">{errors?.Nombre}</p>
            )}
            {Boolean(errors.Vida) && <p className="error">{errors?.Vida}</p>}
            {Boolean(errors.Ataque) && (
              <p className="error">{errors?.Ataque}</p>
            )}

            {Boolean(errors.Defensa) && (
              <p className="error">{errors?.Defensa}</p>
            )}
            {Boolean(errors.Velocidad) && (
              <p className="error">{errors?.Velocidad}</p>
            )}
            {Boolean(errors.Altura) && (
              <p className="error">{errors?.Altura}</p>
            )}

            {Boolean(errors.Peso) && <p className="error">{errors?.Peso}</p>}

            {Boolean(errors.tipo) && <p className="error">{errors?.tipo}</p>}
          </div>
        )}
        <div className="item_form">
          <form onSubmit={submitHandler}>
            <button type="submit" className="button_form guardar" />
          </form>
          <button
            type="submit"
            className="button_form home"
            onClick={handleGoHome}
          >
            Volver al laboratorio
          </button>
        </div>
      </div>
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a46ee40-0984-4211-86e0-49db0a683386/d8ym1z0-cc0fd464-45a3-4ee8-9984-466426ac5fa5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBhNDZlZTQwLTA5ODQtNDIxMS04NmUwLTQ5ZGIwYTY4MzM4NlwvZDh5bTF6MC1jYzBmZDQ2NC00NWEzLTRlZTgtOTk4NC00NjY0MjZhYzVmYTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Q2setXQhnWSSq6JXlJWzPxuQDpVNZqpxS7hAq9svGVc"
        alt="download"
        className="imagen_pokemon"
      />
    </>
  );
};

export const mapStateToProps = ({ types }) => {
  return {
    types,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getTypes: () => {
      return dispatch(actions.getTypes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPokemon);
