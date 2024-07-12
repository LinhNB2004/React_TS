import React, { ComponentPropsWithRef } from "react";

type ButtonProps = {
  el: "button";
  title: string;
} & ComponentPropsWithRef<"button">;
type AnchorProps = {
  el: "anchor";
  title: string;
} & ComponentPropsWithRef<"a">;

const CustomElement = (props: ButtonProps | AnchorProps) => {
  return props.el == "button" ? (
    <button {...props}>{props.title}</button>
  ) : (
    <a {...props}>{props.title}</a>
  );
};

export default CustomElement;
