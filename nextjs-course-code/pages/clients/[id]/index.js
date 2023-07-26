import { useRouter } from "next/router";

function ClientProjectPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    // router.push("/clients/max/projectA");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projectA" },
    });
  }

  return (
    <div>
      <h1>The Client Project Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectPage;
