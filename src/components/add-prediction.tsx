import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { Activity } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  codedDay: z.string(),
  zone: z.string(),
  temperature: z.string(),
});

export function AddPrediction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codedDay: "1",
      zone: "50",
      temperature: "34",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(predictionData: z.infer<typeof formSchema>) {
    const newPredictionData = {
      coded_day: Number(predictionData.codedDay),
      zone: Number(predictionData.zone),
      temperature: Number(predictionData.temperature),
      weather: 56,
    };
    console.log(newPredictionData);

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/predictions",
        newPredictionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Prediction added", {
        description: `Incoming traffic - ${response.data.traffic}`,
      });
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Error posting data");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="bg-[#030303] text-white">
      <Dialog>
        <DialogTrigger asChild className="bg-[#030303] text-white">
          <Button className="bg-green-400 text-black hover:bg-white hover:cursor-pointer">
            Start Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[505px] bg-[#030303] text-white">
          <DialogHeader>
            <DialogTitle>Predict Traffic</DialogTitle>
            <DialogDescription className="text-slate-100">
              Want to go somewhere and you're curios about the traffic? You can
              make predictions on the number of vehicles at a given place.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#030303]"
            >
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="codedDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coded Day</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[400px]">
                            <SelectValue placeholder="Monday" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="text-black font-extrabold">
                                Select Day
                              </SelectLabel>

                              <SelectItem value="1">Monday</SelectItem>
                              <SelectItem value="2">Tuesday</SelectItem>
                              <SelectItem value="3">Wednesday</SelectItem>
                              <SelectItem value="4">Thursday</SelectItem>
                              <SelectItem value="5">Friday</SelectItem>
                              <SelectItem value="6">Saturday</SelectItem>
                              <SelectItem value="7">Sunday</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Any day of the week</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[400px]">
                            <SelectValue placeholder="Urban City Centers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="text-black font-extrabold">
                                Select Zone
                              </SelectLabel>

                              <SelectItem value="50">
                                Urban City Centers
                              </SelectItem>
                              <SelectItem value="100">
                                Highways & Expressways
                              </SelectItem>
                              <SelectItem value="150">
                                Industrial Zones
                              </SelectItem>
                              <SelectItem value="200">
                                Mountainous Regions
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        The zone for which to predict the traffic.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input {...field} className="col-span-3 w-[400px]" />
                      </FormControl>
                      <FormDescription>
                        The temperature for the given zone on a given day.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-green-300 text-black rounded-xl hover:bg-white hover:text-black hover:cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Activity />
                  )}
                  {isSubmitting ? "Predicting" : "Predict"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
