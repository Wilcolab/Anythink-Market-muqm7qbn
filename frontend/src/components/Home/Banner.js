import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part">get</span>
          <input
            id="search-box"
            name="search"
            className="search-box"
            placeholder="What is it that you truly desire?"
            onChange={(ev) => {
              if (ev.target.value.length >= 3) {
                props.onSearchChange(
                  ev.target.value,
                  (page) => agent.Items.bySearch(ev.target.value, page),
                  agent.Items.bySearch(ev.target.value)
                );
              } 
            }}
          />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
