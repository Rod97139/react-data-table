# TypeScript Components by Rod

This repository was created as part of a guide to publishing TypeScript React components. You can read the guide over here: [Publishing TypeScript React components to NPM](https://fildon.hashnode.dev/publishing-typescript-react-components-to-npm)

## Getting Started

Install this package:

```shell
npm i react-data-table-by-rod
```

Import the ReactDataTable component:

```js
import { ReactDataTable } from "react-data-table-by-rod";

const App = () => {
  return (
    <div>
      <ReactDataTable
        data={[
          { id: 1, name: "John Doe", age: 32, birthdate: "01-01-1990" },
          { id: 2, name: "Jane Doe", age: 28, birthdate: "01-01-1990" },
          { id: 3, name: "John Smith", age: 45, birthdate: "01-01-1990" }
        ]}
        dateFormatKey={['birthdate']}
      />
    </div>
  );
};

export default App;
```

You can then render the `ReactDataTable` component like any other React component in JSX.
