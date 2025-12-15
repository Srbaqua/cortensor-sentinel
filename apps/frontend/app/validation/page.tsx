import EvidenceTable from "@/components/EvidenceTable";
import { Button } from "@/components/ui/button";

export default async function ValidationPage() {
  const data = await fetch("http://localhost:3001/validate/0").then(r => r.json());
 <Button
  onClick={() => {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "validation-evidence.json";
    a.click();
  }}
>
  ⬇ Export Evidence
</Button>



  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Validation Evidence</h1>
      <p className="text-muted-foreground">
        Proof-of-Inference / Proof-of-Useful-Work Artifacts
      </p>
     

      

      <EvidenceTable tasks={data.evidence.outputs} />
    </div>
  );
}
