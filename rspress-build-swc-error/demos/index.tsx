import { useState } from "react";
import { DolphinDBEditor } from "../components/dolphindb-editor";

export default () => {
  const [code, setCode] = useState("a + b");

  return (
    <div style={{ height: 400 }}>
      <DolphinDBEditor value={code} onChange={setCode} />
    </div>
  );
};
