import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const MultipleInput = ({
 selectedInputs, values, labelId,
}) => {
  let initialInputs;

  if (values.length > 0) {
    initialInputs = values.map((value) => {
      const id = uuid();
      return { val: value, id };
    });
  } else {
    initialInputs = [];
  }

  const [inputs, setInputs] = useState(initialInputs);

  useEffect(() => {
    if (values.length === 0) setInputs(values);
  }, [values, setInputs]);

  const addInputs = (e) => {
    if (e.key === ',' && e.target.value !== '') {
      const newInput = { val: e.target.value.replace(',', ''), id: uuid() };
      const newInputs = [...inputs, newInput];
      setInputs(newInputs);
      selectedInputs(newInputs.map((input) => input.val));
      e.target.value = '';
    }
  };

  const removeInputs = (deleted) => {
    const newInputs = [...inputs].filter((input) => input.id !== deleted.id);
    setInputs(newInputs);
    selectedInputs(newInputs.map((input) => input.val));
  };

  return (
    <div className="multiple-input">
      <ul id="inputs">
        {inputs.map((input) => {
          const { id } = input;
          return (
            <li className="input" key={id}>
              <span className="input-title">{input.val}</span>
              <span
                className="input-close-icon"
                onClick={() => removeInputs(input)}
                id={id}
              >
                X
              </span>
            </li>
          );
        })}
      </ul>
      <input
        id={labelId}
        className="multiple-input-box"
        type="text"
        placeholder="Entries are comma separated"
        onKeyUp={(e) => addInputs(e)}
        defaultValue=""
      />
    </div>
  );
};

MultipleInput.propTypes = {
  selectedInputs: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  labelId: PropTypes.string.isRequired,
};

export default MultipleInput;
