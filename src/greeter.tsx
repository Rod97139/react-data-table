import * as React from "react";

interface IProps {
    name: string;
}

export function Greeter({name}: IProps) {
  return (
    <>
      <p>Bonjour {name} times</p>
    </>
  );
}
