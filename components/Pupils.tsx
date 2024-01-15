import React from "react";

const Pupils = ({ pupil }: any) => {
  return (
    <div key={pupil.id} className="card shadow px-2 py-3 space-y-2 ">
      <h3 className="text-lightBlue font-bold"> Name: {pupil.name}</h3>
      <p className="capitalize">class: {pupil.class}</p>
      <ul className="list">
        <p>Subjects:</p>
        {Object.values(pupil.subjects)
          .filter((val) => typeof val === "string")
          .map((val, index) => (
            <li className="list-item capitalize pl-2 text-dark" key={index + 1}>
              {val as string}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pupils;
