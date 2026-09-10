import { db } from "../firebase/firestore";

function TestFirebase() {

  console.log(db);

  return (
    <div className="p-10 text-4xl">
      Firebase Connected ✅
    </div>
  );
}

export default TestFirebase;