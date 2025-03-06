<![CDATA["use client";

import { useState } from "react";
import { Clock, Plus, Minus, ArrowLeftRight, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addHours, addMinutes, addSeconds, format, differenceInSeconds, parse } from "date-fns";

export default function Calculator() {
  const [baseTime, setBaseTime] = useState("00:00");
  const [timeUnit, setTimeUnit] = useState<"hours" | "minutes" | "seconds">("hours");
  const [timeValue, setTimeValue, ] = useState("0");
  const [operation, setOperation] = useState("add");
  const [addSubtractResult, setAddSubtractResult] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeDifference, setTimeDifference] = useState("");

  const [fromUnit, setFromUnit] = useState<"hours" | "minutes" | "seconds">("hours");
  const [toUnit, setToUnit] = useState<"hours" | "minutes" | "seconds">("minutes");
  const [convertValue, setConvertValue] = useState("1");
  const [conversionResult, setConversionResult] = useState("");

  const [baseDate, setBaseDate] = useState("");
  const [dateUnit, setDateUnit] = useState<"days" | "months" | "years">("days");
  const [dateValue, setDateValue] = useState("0");
  const [dateOperation, setDateOperation] = useState("add");
  const [dateResult, setDateResult] = useState("");

  const calculateAddSubtract = () => {
    try {
      const baseDate = parse(baseTime, "HH:mm", new Date());
      const value = parseInt(timeValue);

      if (isNaN(value)) {
        setAddSubtractResult("Invalid time value");
        return;
      }

      let result;

      if (operation === "add") {
        switch (timeUnit) {
          case "hours":
            result = addHours(baseDate, value);
            break;
          case "minutes":
            result = addMinutes(baseDate, value);
            break;
          case "seconds":
            result = addSeconds(baseDate, value);
            break;
          default:
            return;
        }
      } else {
        switch (timeUnit) {
          case "hours":
            result = addHours(baseDate, -value);
            break;
          case "minutes":
            result = addMinutes(baseDate, -value);
            break;
          case "seconds":
            result = addSeconds(baseDate, -value);
            break;
          default:
            return;
        }
      }

      setAddSubtractResult(format(result, "HH:mm:ss"));
    } catch (error) {
      setAddSubtractResult("Invalid input");
    }
  };

  const calculateTimeDifference = () => {
    try {
      const start = parse(startTime, "HH:mm", new Date());
      const end = parse(endTime, "HH:mm", new Date());
      const diffInSeconds = Math.abs(differenceInSeconds(end, start));
      
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setTimeDifference(`${hours}h ${minutes}m ${seconds}s`);
    } catch (error) {
      setTimeDifference("Invalid input");
    }
  };

  const convertTimeUnits = () => {
    const value = parseFloat(convertValue);
    if (isNaN(value)) {
      setConversionResult("Please enter a valid number");
      return;
    }

    const conversions = {
      hours: {
        hours: (v: number): number => v,
        minutes: (v: number): number => v * 60,
        seconds: (v: number): number => v * 3600,
      },
      minutes: {
        hours: (v: number): number => v / 60,
        minutes: (v: number): number => v,
        seconds: (v: number): number => v * 60,
      },
      seconds: {
        hours: (v: number): number => v / 3600,
        minutes: (v: number): number => v / 60,
        seconds: (v: number): number => v,
      },
    };

    const result = conversions[fromUnit][toUnit](value);
    const units = {
      hours: "h",
      minutes: "min",
      seconds: "sec",
    };

    setConversionResult(`= ${result} ${units[toUnit as keyof typeof units]}`);
  };

  const calculateDate = () => {
    try {
      if (!baseDate) {
        setDateResult("Please enter a valid date");
        return;
      }

      const base = new Date(baseDate);
      const value = parseInt(dateValue);

      if (isNaN(value)) {
        setDateResult("Invalid date value");
        return;
      }

      let result;

      if (dateOperation === "add") {
        switch (dateUnit) {
          case "days":
            result = new Date(base.setDate(base.getDate() + value));
            break;
          case "months":
            result = new Date(base.setMonth(base.getMonth() + value));
            break;
          case "years":
            result = new Date(base.setFullYear(base.getFullYear() + value));
            break;
          default:
            return;
        }
      } else {
        switch (dateUnit) {
          case "days":
            result = new Date(base.setDate(base.getDate() - value));
            break;
          case "months":
            result = new Date(base.setMonth(base.getMonth() - value));
            break;
          case "years":
            result = new Date(base.setFullYear(base.getFullYear() - value));
            break;
          default:
            return;
        }
      }

      setDateResult(format(result, "PPP"));
    } catch (error) {
      setDateResult("Invalid input");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Clock className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Time Calculator</h1>
      </div>

      <Tabs defaultValue="add-subtract" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full overflow-x-auto">
          <TabsTrigger value="add-subtract" className="space-x-2">
            <Plus className="h-4 w-4" /> <span className="hidden xs:inline">Add/Subtract</span>
          </TabsTrigger>
          <TabsTrigger value="difference" className="space-x-2">
            <ArrowLeftRight className="h-4 w-4" /> <span className="hidden xs:inline">Time Difference</span>
          </TabsTrigger>
          <TabsTrigger value="convert" className="space-x-2">
            <ArrowLeftRight className="h-4 w-4" /> <span className="hidden xs:inline">Convert Time</span>
          </TabsTrigger>
          <TabsTrigger value="date-time" className="space-x-2">
            <Calendar className="h-4 w-4" /> <span className="hidden xs:inline">Date & Time</span>
          </TabsTrigger>
        </TabsList>

        {/* Add/Subtract Time */}
        <TabsContent value="add-subtract" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Base Time</Label>
              <Input
                type="time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add</SelectItem>
                  <SelectItem value="subtract">Subtract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                min="0"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="seconds">Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculateAddSubtract}>Calculate</Button>
          {addSubtractResult && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-lg font-semibold">Result: {addSubtractResult}</p>
            </div>
          )}
        </TabsContent>

        {/* Time Difference */}
        <TabsContent value="difference" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculateTimeDifference}>Calculate Difference</Button>
          {timeDifference && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-lg font-semibold">Time Difference: {timeDifference}</p>
            </div>
          )}
        </TabsContent>

        {/* Convert Time */}
        <TabsContent value="convert" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as "hours" | "minutes" | "seconds")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours (h)</SelectItem>
                  <SelectItem value="minutes">Minutes (min)</SelectItem>
                  <SelectItem value="seconds">Seconds (sec)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={(value) => setToUnit(value as "hours" | "minutes" | "seconds")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours (h)</SelectItem>
                  <SelectItem value="minutes">Minutes (min)</SelectItem>
                  <SelectItem value="seconds">Seconds (sec)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Value to Convert</Label>
              <Input
                type="number"
                min="0"
                step="any"
                value={convertValue}
                onChange={(e) => setConvertValue(e.target.value)}
                className="max-w-[200px]"
              />
            </div>
          </div>
          <Button onClick={convertTimeUnits}>Convert</Button>
          {conversionResult && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-lg font-semibold">{conversionResult}</p>
            </div>
          )}
        </TabsContent>

        {/* Date & Time Calculator */}
        <TabsContent value="date-time" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Base Date</Label>
              <Input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Operation</Label>
              <Select value={dateOperation} onValueChange={setDateOperation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add</SelectItem>
                  <SelectItem value="subtract">Subtract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                min="0"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={dateUnit} onValueChange={(value) => setDateUnit(value as "days" | "months" | "years")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculateDate}>Calculate</Button>
          {dateResult && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-lg font-semibold">Result: {dateResult}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
"]]>
