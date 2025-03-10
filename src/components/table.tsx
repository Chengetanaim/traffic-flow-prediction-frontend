import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

interface Prediction {
  day_name: number;
  zone_name: number;
  weather: number;
  temperature: number;
  traffic: number;
}

export function PredictionsTable() {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/predictions");
        setPredictions(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Table>
      <TableCaption>A list of your recent predictions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Day</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead className="text-right">Traffic</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {predictions?.map((prediction) => (
          <TableRow key={prediction.day_name}>
            <TableCell className="font-medium">{prediction.day_name}</TableCell>
            <TableCell>{prediction.zone_name}</TableCell>
            <TableCell>{prediction.temperature}°C</TableCell>
            <TableCell className="text-right">{prediction.traffic}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-black">
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total
          </TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
