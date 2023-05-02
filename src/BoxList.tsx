import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

/** Manage list of boxes
 *
 * State:
 * - boxes: [ { id, width, height, backgroundColor }, ... ]
 */

interface IBoxForm {
  id: string,
  width: string,
  height: string,
  backgroundColor: string,
}

interface IBox {
  id: string,
  width: number,
  height: number,
  backgroundColor: string,
}

function BoxList(): JSX.Element {
  //box interfaces
  const [boxes, setBoxes] = useState<IBox[] | []>([]);

  /** add box with given { id, width, height, backgroundColor } */
  function add(newBox: IBoxForm): void {
    const box= {...newBox, width: +newBox.width, height: +newBox.height }
    setBoxes(boxes => [...boxes, box]);
  }

  /** remove box matching that id. */
  function remove(id: string): void {
    setBoxes(boxes => boxes.filter((box: IBox) => box.id !== id));
  }

  return (
    <div className="BoxList">
      <NewBoxForm createBox={add} />
      {boxes.map(({ id, width, height, backgroundColor }) => (
        <Box
          key={id}
          id={id}
          width={width}
          height={height}
          remove={remove}
          backgroundColor={backgroundColor}
        />
      ))}
    </div>
  );
}

export default BoxList;
