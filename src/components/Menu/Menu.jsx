import React from "react";
import { NavLink } from "react-router-dom";

export default ({ close }) => (
  <div className="menu">
    <ul>
      <li>
        <NavLink onClick={close} activeClassName="current" to="pushup">
          Pushsideways
        </NavLink>
      </li>
      <li>
        <NavLink onClick={close} activeClassName="current" to="ranking">
          Ranking
        </NavLink>
      </li>
    </ul>
  </div>
);
