import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const agents = [
  { name: "VoiceAide : John", calls: 32, minutes: 6, credits: "2,679" },
  { name: "SkyAgent", calls: 30, minutes: 67, credits: "36,638" },
  { name: "AutoAide", calls: 29, minutes: 42, credits: "18,920" },
  { name: "RestaurantAgent", calls: 13, minutes: 13, credits: "5,899" },
];

export default function AgentsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent Name</TableHead>
          <TableHead>Calls</TableHead>
          <TableHead>Minutes</TableHead>
          <TableHead>Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent, index) => (
          <TableRow key={index}>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.calls}</TableCell>
            <TableCell>{agent.minutes}</TableCell>
            <TableCell>{agent.credits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}