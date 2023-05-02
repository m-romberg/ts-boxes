import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height, width, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */

interface IFormData {
  height: string,
  width: string,
  backgroundColor: string;
}

interface IBoxForm {
  id: string,
  width: string,
  height: string,
  backgroundColor: string,
}

interface NewBoxFormPropsInterface {
  createBox: (newBox: IBoxForm) => void,
}

function NewBoxForm({ createBox }: NewBoxFormPropsInterface): JSX.Element {
  const [formData, setFormData] = useState<IFormData>({
    height: "",
    width: "",
    backgroundColor: "",
  });

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  }

  return (
    <div className="NewBoxForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newBox-height">Height</label>
          <input
            id="newBox-height"
            onChange={handleChange}
            name="height"
            value={formData.height}
          />
        </div>
        <div>
          <label htmlFor="newBox-width">Width</label>
          <input
            id="newBox-width"
            onChange={handleChange}
            name="width"
            value={formData.width}
          />
        </div>
        <div>
          <label htmlFor="newBox-backgroundColor">Background Color</label>
          <input
            id="newBox-backgroundColor"
            onChange={handleChange}
            name="backgroundColor"
            value={formData.backgroundColor}
          />
        </div>
        <button className="NewBoxForm-addBtn">Add a new box!</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
